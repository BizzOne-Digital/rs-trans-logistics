import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import QuoteRequest from '@/models/QuoteRequest';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const quote = await QuoteRequest.findById(id);
    if (!quote) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(quote);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch quote request' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const data = await req.json();
    const quote = await QuoteRequest.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json({ success: true, quote });
  } catch {
    return NextResponse.json({ error: 'Failed to update quote request' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    await QuoteRequest.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete quote request' }, { status: 500 });
  }
}
