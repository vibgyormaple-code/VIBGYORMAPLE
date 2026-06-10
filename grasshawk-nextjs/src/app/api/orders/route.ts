import { NextRequest, NextResponse } from 'next/server';
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

    // Generate a unique mock order ID instead of MongoDB ObjectId
    const mockOrderId = `GH-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = {
      _id: mockOrderId,
      customerName,
      email,
      phone,
      address,
      items,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod,
      paymentStatus,
      status: 'confirmed',
      createdAt: new Date(),
    };

    // Send emails (non-blocking) - sends details to business/supplier and confirmation to customer
    sendOrderNotification({
      _id: mockOrderId,
      customerName,
      email,
      phone,
      address,
      items,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod
    }).catch(console.error);

    sendOrderConfirmation({
      _id: mockOrderId,
      customerName,
      email,
      items,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod,
      address
    }).catch(console.error);

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error('POST /api/orders error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // Return empty list or mock list since database is removed
  return NextResponse.json({ orders: [] });
}
