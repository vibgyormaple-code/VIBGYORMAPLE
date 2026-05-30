import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { sendOrderNotification, sendOrderConfirmation } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName, email, phone, address,
      items, subtotal, tax, shipping, total,
      paymentMethod, paymentStatus = 'pending',
    } = body;

    if (!customerName || !email || !phone || !address || !items?.length || !paymentMethod) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    const order = await Order.create({
      customerName, email, phone, address,
      items, subtotal, tax, shipping, total,
      paymentMethod, paymentStatus,
      status: 'confirmed',
    });

    // Send emails (non-blocking)
    sendOrderNotification({ _id: order._id.toString(), customerName, email, phone, address, items, subtotal, tax, shipping, total, paymentMethod }).catch(console.error);
    sendOrderConfirmation({ _id: order._id.toString(), customerName, email, items, subtotal, tax, shipping, total, paymentMethod, address }).catch(console.error);

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error('POST /api/orders error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('GET /api/orders error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
