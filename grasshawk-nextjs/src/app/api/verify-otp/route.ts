import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import OTP from '@/models/OTP';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
    }

    await dbConnect();

    const record = await OTP.findOne({
      email: email.toLowerCase(),
      used: false,
    }).sort({ createdAt: -1 });

    if (!record) {
      return NextResponse.json({ message: 'OTP not found. Please request a new code.' }, { status: 400 });
    }

    if (new Date() > record.expiresAt) {
      await OTP.deleteOne({ _id: record._id });
      return NextResponse.json({ message: 'OTP has expired. Please request a new code.' }, { status: 400 });
    }

    if (record.otp !== otp.toString()) {
      return NextResponse.json({ message: 'Invalid OTP. Please check and try again.' }, { status: 400 });
    }

    // Mark as used
    record.used = true;
    await record.save();

    return NextResponse.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('POST /api/verify-otp error:', error);
    return NextResponse.json({ message: 'Verification failed' }, { status: 500 });
  }
}
