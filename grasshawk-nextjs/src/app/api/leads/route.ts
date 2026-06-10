import { NextRequest, NextResponse } from 'next/server';
import { sendLeadNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, companyName, email, phone, message, inquiryType } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Await notification email so Vercel does not terminate the execution
    await sendLeadNotification({
      name,
      companyName,
      email,
      phone,
      message,
      inquiryType: inquiryType || 'general'
    }).catch(console.error);

    // Return a mock success response without saving to database
    return NextResponse.json({
      success: true,
      lead: { name, companyName, email, phone, message, inquiryType: inquiryType || 'general', createdAt: new Date() }
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/leads error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
