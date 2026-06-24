import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const query: Record<string, unknown> = {};
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ];
    }

    const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
    const total = await ContactMessage.countDocuments();
    const newCount = await ContactMessage.countDocuments({ status: 'new' });

    return NextResponse.json({ messages, total, newCount });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch contact messages' }, { status: 500 });
  }
}
