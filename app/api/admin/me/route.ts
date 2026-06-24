import { NextResponse } from 'next/server';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ admin });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
