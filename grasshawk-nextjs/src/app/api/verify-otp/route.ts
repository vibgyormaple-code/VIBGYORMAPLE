import { NextRequest, NextResponse } from 'next/server';
import { otpCache } from '@/lib/memoryStore';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
    }

    const key = email.toLowerCase();
    const record = otpCache.get(key);

    if (!record || record.used) {
      return NextResponse.json({ message: 'OTP not found or already used. Please request a new code.' }, { status: 400 });
    }

    if (new Date() > record.expiresAt) {
      otpCache.delete(key);
      return NextResponse.json({ message: 'OTP has expired. Please request a new code.' }, { status: 400 });
    }

    if (record.otp !== otp.toString()) {
      return NextResponse.json({ message: 'Invalid OTP. Please check and try again.' }, { status: 400 });
    }

    // Mark as used
    record.used = true;
    otpCache.set(key, record);

    return NextResponse.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('POST /api/verify-otp error:', error);
    return NextResponse.json({ message: 'Verification failed' }, { status: 500 });
  }
}
