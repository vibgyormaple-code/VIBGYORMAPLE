import { NextRequest, NextResponse } from 'next/server';
import razorpay from '@/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'CAD', receipt } = await req.json();

    if (!amount) {
      return NextResponse.json({ message: 'Amount is required' }, { status: 400 });
    }

    // Razorpay expects amount in smallest unit (paise/cents)
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: receipt || `grasshawk_${Date.now()}`,
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Razorpay create order error:', error);
    return NextResponse.json({ message: 'Failed to create payment order' }, { status: 500 });
  }
}
