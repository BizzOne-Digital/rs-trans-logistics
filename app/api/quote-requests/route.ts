import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuoteRequest from '@/models/QuoteRequest';
import { sendQuoteNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();

    const { fullName, phone, email, pickupLocation, deliveryLocation, freightType } = data;
    if (!fullName || !phone || !email || !pickupLocation || !deliveryLocation || !freightType) {
      return NextResponse.json({ error: 'Please fill in all required fields' }, { status: 400 });
    }

    const quote = await QuoteRequest.create(data);

    // Send email notification (non-blocking)
    try {
      await sendQuoteNotification(data);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you. Your quote request has been received. Our team will contact you shortly.',
      id: quote._id,
    });
  } catch (error) {
    console.error('Quote request error:', error);
    return NextResponse.json({ error: 'Failed to submit quote request' }, { status: 500 });
  }
}
