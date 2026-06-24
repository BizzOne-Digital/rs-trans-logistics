import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';
import { getAdminFromCookie } from '@/lib/auth';

export async function PUT(req: NextRequest) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const data = await req.json();

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(data);
    } else {
      Object.assign(settings, data);
      await settings.save();
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
