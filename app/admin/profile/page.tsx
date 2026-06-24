'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { User, Lock, Save, Eye, EyeOff } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

interface PasswordForm { currentPassword: string; newPassword: string; confirmPassword: string; }

export default function AdminProfilePage() {
  const [admin, setAdmin] = useState<{ name: string; email: string; role: string } | null>(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<PasswordForm>();

  useEffect(() => {
    fetch('/api/admin/me').then((r) => r.json()).then((d) => { if (d.admin) setAdmin(d.admin); });
  }, []);

  const onSubmit = async (data: PasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: data.currentPassword, newPassword: data.newPassword }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      toast.success('Password changed successfully');
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to change password');
    } finally { setSaving(false); }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="My Profile" />
      <div className="flex-1 p-6 max-w-2xl">
        {/* Profile Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card border border-white/5 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">{admin?.name || 'Admin'}</h2>
              <p className="text-slate-400">{admin?.email}</p>
              <span className="text-xs glass px-2 py-0.5 rounded-full text-blue-400 border border-blue-500/20 mt-1 inline-block">
                {admin?.role || 'admin'}
              </span>
            </div>
          </div>
          <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
            <p className="text-yellow-400 text-sm font-medium mb-1">⚠️ Security Reminder</p>
            <p className="text-slate-500 text-sm">Change the default password before going to production. Use a strong, unique password.</p>
          </div>
        </motion.div>

        {/* Change Password */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-bold">Change Password</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Current Password</label>
              <div className="relative">
                <input {...register('currentPassword', { required: 'Current password is required' })}
                  type={showCurrent ? 'text' : 'password'}
                  className="form-input w-full px-4 py-3 pr-10 rounded-xl text-sm" />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.currentPassword && <p className="text-red-400 text-xs mt-1">{errors.currentPassword.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">New Password</label>
              <div className="relative">
                <input {...register('newPassword', { required: 'New password is required', minLength: { value: 8, message: 'At least 8 characters' } })}
                  type={showNew ? 'text' : 'password'}
                  className="form-input w-full px-4 py-3 pr-10 rounded-xl text-sm" />
                <button type="button" onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.newPassword && <p className="text-red-400 text-xs mt-1">{errors.newPassword.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Confirm New Password</label>
              <input {...register('confirmPassword', { required: 'Please confirm password' })}
                type="password" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <button type="submit" disabled={saving}
              className="btn-shine flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-60">
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Change Password</>}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
