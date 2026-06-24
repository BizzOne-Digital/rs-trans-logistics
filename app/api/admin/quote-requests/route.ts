import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuoteRequest from '@/models/QuoteRequest';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const freightType = searchParams.get('freightType');
    const search = searchParams.get('search');

    const query: Record<string, unknown> = {};
    if (status && status !== 'all') query.status = status;
    if (freightType && freightType !== 'all') query.freightType = freightType;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
      ];
    }

    const quotes = await QuoteRequest.find(query).sort({ createdAt: -1 });
    const total = await QuoteRequest.countDocuments();
    const newCount = await QuoteRequest.countDocuments({ status: 'new' });

    return NextResponse.json({ quotes, total, newCount });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quote requests' }, { status: 500 });
  }
}
