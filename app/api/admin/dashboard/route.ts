import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuoteRequest from '@/models/QuoteRequest';
import ContactMessage from '@/models/ContactMessage';
import Service from '@/models/Service';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const [
      totalQuotes,
      newQuotes,
      totalMessages,
      newMessages,
      totalServices,
      recentQuotes,
      recentMessages,
    ] = await Promise.all([
      QuoteRequest.countDocuments(),
      QuoteRequest.countDocuments({ status: 'new' }),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ status: 'new' }),
      Service.countDocuments({ isActive: true }),
      QuoteRequest.find().sort({ createdAt: -1 }).limit(5),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5),
    ]);

    return NextResponse.json({
      totalQuotes,
      newQuotes,
      totalMessages,
      newMessages,
      totalServices,
      recentQuotes,
      recentMessages,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
