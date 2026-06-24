import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({ isActive: true }).sort({ sortOrder: 1 });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Services fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
