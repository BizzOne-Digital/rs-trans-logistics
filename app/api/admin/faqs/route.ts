import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FAQ from '@/models/FAQ';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const faqs = await FAQ.find().sort({ sortOrder: 1 });
    return NextResponse.json(faqs);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const data = await req.json();
    const faq = await FAQ.create(data);
    return NextResponse.json({ success: true, faq }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
