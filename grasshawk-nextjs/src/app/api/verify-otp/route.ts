import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email, otp, otpToken } = await req.json();

    if (!email || !otp || !otpToken) {
      return NextResponse.json({ message: 'Email, OTP, and token are required' }, { status: 400 });
    }

    const key = email.toLowerCase();
    
    // Parse the otpToken (format: "email:expiresAt.hash")
    const parts = otpToken.split('.');
    if (parts.length !== 2) {
      return NextResponse.json({ message: 'Invalid token format' }, { status: 400 });
    }
    
    const payload = parts[0]; // "email:expiresAt"
    const receivedHash = parts[1];
    
    const payloadParts = payload.split(':');
    if (payloadParts.length !== 2) {
      return NextResponse.json({ message: 'Invalid payload format' }, { status: 400 });
    }
    
    const payloadEmail = payloadParts[0];
    const expiresAt = parseInt(payloadParts[1], 10);

    // Verify email matches
    if (payloadEmail !== key) {
      return NextResponse.json({ message: 'Email mismatch' }, { status: 400 });
    }

    // Verify expiry
    if (Date.now() > expiresAt) {
      return NextResponse.json({ message: 'OTP has expired. Please request a new one.' }, { status: 400 });
    }

    // Verify hash
    const secret = process.env.JWT_SECRET || 'fallback-secret-for-dev';
    const expectedHash = crypto.createHmac('sha256', secret).update(`${payload}:${otp}`).digest('hex');

    if (expectedHash !== receivedHash) {
      return NextResponse.json({ message: 'Invalid OTP code' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('POST /api/verify-otp error:', error);
    return NextResponse.json({ message: 'Failed to verify OTP' }, { status: 500 });
  }
}
