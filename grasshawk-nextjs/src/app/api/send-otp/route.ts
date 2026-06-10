import { NextRequest, NextResponse } from 'next/server';
import { sendOTPEmail } from '@/lib/email';
import crypto from 'crypto';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Valid email is required' }, { status: 400 });
    }

    const key = email.toLowerCase();
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Create a stateless hashed token (HMAC)
    const payload = `${key}:${expiresAt}`;
    const secret = process.env.JWT_SECRET || 'fallback-secret-for-dev';
    const hash = crypto.createHmac('sha256', secret).update(`${payload}:${otp}`).digest('hex');
    const otpToken = `${payload}.${hash}`;

    // Send OTP email
    await sendOTPEmail(email, otp);

    // Return the token to the client (stateless verification)
    return NextResponse.json({ success: true, message: 'OTP sent to email', otpToken });
  } catch (error) {
    console.error('POST /api/send-otp error:', error);
    return NextResponse.json({ message: 'Failed to send OTP' }, { status: 500 });
  }
}
