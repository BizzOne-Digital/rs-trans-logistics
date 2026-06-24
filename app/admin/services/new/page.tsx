'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

export default function NewServicePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', slug: '', icon: 'truck', shortDescription: '', detailedDescription: '',
    bestFor: [''], benefits: [{ title: '', description: '' }],
    processSteps: [{ step: 1, title: '', description: '' }],
    relatedServices: [''], sortOrder: 0, isActive: true, seoTitle: '', seoDescription: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          bestFor: form.bestFor.filter(Boolean),
          relatedServices: form.relatedServices.filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error('Failed to create service');
      toast.success('Service created successfully');
      router.push('/admin/services');
    } catch { toast.error('Failed to create service'); }
    finally { setSaving(false); }
  };

  const updateBestFor = (i: number, val: string) => {
    const arr = [...form.bestFor]; arr[i] = val; setForm({ ...form, bestFor: arr });
  };
  const updateBenefit = (i: number, field: string, val: string) => {
    const arr = [...form.benefits]; arr[i] = { ...arr[i], [field]: val }; setForm({ ...form, benefits: arr });
  };
  const updateStep = (i: number, field: string, val: string | number) => {
    const arr = [...form.processSteps]; arr[i] = { ...arr[i], [field]: val }; setForm({ ...form, processSteps: arr });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="Add New Service" />
      <div className="flex-1 p-6 max-w-4xl">
        <button onClick={() => router.push('/admin/services')}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </button>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Service Title *</label>
                <input value={form.title} onChange={(e) => {
                  setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') });
                }} required className="form-input w-full px-4 py-3 rounded-xl text-sm" placeholder="e.g. Dry Vans" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">URL Slug *</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required
                  className="form-input w-full px-4 py-3 rounded-xl text-sm" placeholder="e.g. dry-vans" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Icon</label>
                <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="form-input w-full px-4 py-3 rounded-xl text-sm bg-[#111827]">
                  {['truck', 'thermometer', 'package', 'layers', 'container', 'git-merge'].map((ic) => (
                    <option key={ic} value={ic}>{ic}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Sort Order</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) })}
                  className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-2">Short Description *</label>
                <input value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} required
                  className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-2">Detailed Description *</label>
                <textarea value={form.detailedDescription} onChange={(e) => setForm({ ...form, detailedDescription: e.target.value })}
                  rows={5} required className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="active" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-blue-500" />
                <label htmlFor="active" className="text-slate-300 text-sm">Active (visible on website)</label>
              </div>
            </div>
          </motion.div>

          {/* Best For */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Best For Items</h3>
              <button type="button" onClick={() => setForm({ ...form, bestFor: [...form.bestFor, ''] })}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <div className="space-y-3">
              {form.bestFor.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input value={item} onChange={(e) => updateBestFor(i, e.target.value)}
                    placeholder={`Best for item ${i + 1}`} className="form-input flex-1 px-4 py-2.5 rounded-xl text-sm" />
                  <button type="button" onClick={() => setForm({ ...form, bestFor: form.bestFor.filter((_, j) => j !== i) })}
                    className="p-2.5 text-red-400 hover:text-red-300 glass rounded-xl">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Benefits</h3>
              <button type="button" onClick={() => setForm({ ...form, benefits: [...form.benefits, { title: '', description: '' }] })}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm">
                <Plus className="w-4 h-4" /> Add Benefit
              </button>
            </div>
            <div className="space-y-4">
              {form.benefits.map((b, i) => (
                <div key={i} className="glass p-4 rounded-xl space-y-2">
                  <input value={b.title} onChange={(e) => updateBenefit(i, 'title', e.target.value)}
                    placeholder="Benefit title" className="form-input w-full px-3 py-2 rounded-lg text-sm" />
                  <input value={b.description} onChange={(e) => updateBenefit(i, 'description', e.target.value)}
                    placeholder="Benefit description" className="form-input w-full px-3 py-2 rounded-lg text-sm" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* SEO */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass-card border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">SEO Title</label>
                <input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                  className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">SEO Description</label>
                <textarea value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                  rows={3} className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none" />
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4">
            <button type="submit" disabled={saving}
              className="btn-shine flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-60">
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Create Service</>}
            </button>
            <button type="button" onClick={() => router.push('/admin/services')}
              className="px-8 py-3 border border-white/10 text-slate-400 hover:text-white rounded-xl transition-all">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
