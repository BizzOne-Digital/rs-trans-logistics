'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Truck, Lock, Mail, Eye, EyeOff, Shield } from 'lucide-react';

interface LoginForm { email: string; password: string; }

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Login failed');
      toast.success('Welcome back!');
      router.push('/admin/dashboard');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B12] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-transparent to-orange-900/10" />

      {/* Light streaks */}
      {[...Array(3)].map((_, i) => (
        <motion.div key={i} className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
          style={{ width: `${200 + i * 100}px`, top: `${25 + i * 25}%` }}
          animate={{ x: ['-200px', '110vw'], opacity: [0, 0.5, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, repeatDelay: 4 + i, delay: i * 1.5 }} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 neon-blue">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">RS Trans Logistics</h1>
          <p className="text-slate-400 text-sm mt-1">Admin Panel</p>
        </div>

        <div className="glass-card border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-blue-400" />
            <h2 className="text-white font-bold text-lg">Secure Login</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  placeholder="admin@rstranslogistics.com"
                  className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="form-input w-full pl-10 pr-10 py-3 rounded-xl text-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="btn-shine w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all neon-blue">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : 'Sign In to Admin Panel'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
            <p className="text-yellow-400 text-xs font-medium mb-1">⚠️ Development Credentials</p>
            <p className="text-slate-500 text-xs">Email: admin@rstranslogistics.com</p>
            <p className="text-slate-500 text-xs">Password: Admin123!</p>
            <p className="text-slate-600 text-xs mt-2">Change these before going to production!</p>
          </div>
        </div>

        <p className="text-center text-slate-600 text-sm mt-6">
          <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors">← Back to Website</a>
        </p>
      </motion.div>
    </div>
  );
}
