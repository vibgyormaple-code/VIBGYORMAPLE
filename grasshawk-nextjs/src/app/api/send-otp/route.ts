import { NextRequest, NextResponse } from 'next/server';
import { sendOTPEmail } from '@/lib/email';
import { otpCache } from '@/lib/memoryStore';

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
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store in memory cache instead of database
    otpCache.set(key, {
      email: key,
      otp,
      expiresAt,
      used: false,
    });

    // Send OTP email
    await sendOTPEmail(email, otp);

    return NextResponse.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error('POST /api/send-otp error:', error);
    return NextResponse.json({ message: 'Failed to send OTP' }, { status: 500 });
  }
}
