import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';
import { sendLeadNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, companyName, email, phone, message, inquiryType } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    const lead = await Lead.create({ name, companyName, email, phone, message, inquiryType: inquiryType || 'general' });

    // Send notification email (non-blocking)
    sendLeadNotification({ name, companyName, email, phone, message, inquiryType: inquiryType || 'general' }).catch(console.error);

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('POST /api/leads error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
