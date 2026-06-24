import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';
import { sendContactNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();

    const { name, email, subject, message } = data;
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Please fill in all required fields' }, { status: 400 });
    }

    const contact = await ContactMessage.create(data);

    try {
      await sendContactNotification(data);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We will get back to you shortly.',
      id: contact._id,
    });
  } catch (error) {
    console.error('Contact message error:', error);
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 });
  }
}
