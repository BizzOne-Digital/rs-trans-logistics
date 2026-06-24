import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';
import { getAdminFromCookie } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { currentPassword, newPassword } = await req.json();

    const adminUser = await AdminUser.findById(admin.id);
    if (!adminUser) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });

    const isValid = await adminUser.comparePassword(currentPassword);
    if (!isValid) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });

    adminUser.passwordHash = await bcrypt.hash(newPassword, 12);
    await adminUser.save();

    return NextResponse.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
