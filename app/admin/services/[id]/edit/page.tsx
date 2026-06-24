'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

interface ServiceForm {
  title: string; slug: string; icon: string; shortDescription: string;
  detailedDescription: string; bestFor: string[];
  benefits: { title: string; description: string }[];
  processSteps: { step: number; title: string; description: string }[];
  relatedServices: string[]; sortOrder: number; isActive: boolean;
  seoTitle: string; seoDescription: string;
}

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ServiceForm>({
    title: '', slug: '', icon: 'truck', shortDescription: '', detailedDescription: '',
    bestFor: [''], benefits: [{ title: '', description: '' }],
    processSteps: [{ step: 1, title: '', description: '' }],
    relatedServices: [''], sortOrder: 0, isActive: true, seoTitle: '', seoDescription: '',
  });

  useEffect(() => {
    fetch(`/api/admin/services`).then((r) => r.json()).then((services: Array<ServiceForm & { _id: string }>) => {
      const s = services.find((svc) => svc._id === id);
      if (s) {
        setForm({
          title: s.title, slug: s.slug, icon: s.icon, shortDescription: s.shortDescription,
          detailedDescription: s.detailedDescription, bestFor: s.bestFor?.length ? s.bestFor : [''],
          benefits: s.benefits?.length ? s.benefits : [{ title: '', description: '' }],
          processSteps: s.processSteps?.length ? s.processSteps : [{ step: 1, title: '', description: '' }],
          relatedServices: s.relatedServices?.length ? s.relatedServices : [''],
          sortOrder: s.sortOrder, isActive: s.isActive, seoTitle: s.seoTitle, seoDescription: s.seoDescription,
        });
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, bestFor: form.bestFor.filter(Boolean), relatedServices: form.relatedServices.filter(Boolean) }),
      });
      if (!res.ok) throw new Error('Failed to update');
      toast.success('Service updated');
      router.push('/admin/services');
    } catch { toast.error('Failed to update service'); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-[#070B12]">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const updateBestFor = (i: number, val: string) => { const arr = [...form.bestFor]; arr[i] = val; setForm({ ...form, bestFor: arr }); };
  const updateBenefit = (i: number, field: string, val: string) => { const arr = [...form.benefits]; arr[i] = { ...arr[i], [field]: val }; setForm({ ...form, benefits: arr }); };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="Edit Service" />
      <div className="flex-1 p-6 max-w-4xl">
        <button onClick={() => router.push('/admin/services')}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </button>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Service Title *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">URL Slug *</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Icon</label>
                <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="form-input w-full px-4 py-3 rounded-xl text-sm bg-[#111827]">
                  {['truck', 'thermometer', 'package', 'layers', 'container', 'git-merge'].map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Sort Order</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) })} className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-2">Short Description *</label>
                <input value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} required className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-2">Detailed Description *</label>
                <textarea value={form.detailedDescription} onChange={(e) => setForm({ ...form, detailedDescription: e.target.value })} rows={5} required className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="editActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-blue-500" />
                <label htmlFor="editActive" className="text-slate-300 text-sm">Active (visible on website)</label>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Best For Items</h3>
              <button type="button" onClick={() => setForm({ ...form, bestFor: [...form.bestFor, ''] })} className="flex items-center gap-1 text-blue-400 text-sm">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            {form.bestFor.map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={item} onChange={(e) => updateBestFor(i, e.target.value)} className="form-input flex-1 px-4 py-2.5 rounded-xl text-sm" />
                <button type="button" onClick={() => setForm({ ...form, bestFor: form.bestFor.filter((_, j) => j !== i) })} className="p-2.5 text-red-400 glass rounded-xl"><X className="w-4 h-4" /></button>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Benefits</h3>
              <button type="button" onClick={() => setForm({ ...form, benefits: [...form.benefits, { title: '', description: '' }] })} className="flex items-center gap-1 text-blue-400 text-sm">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            {form.benefits.map((b, i) => (
              <div key={i} className="glass p-4 rounded-xl space-y-2 mb-3">
                <input value={b.title} onChange={(e) => updateBenefit(i, 'title', e.target.value)} placeholder="Benefit title" className="form-input w-full px-3 py-2 rounded-lg text-sm" />
                <input value={b.description} onChange={(e) => updateBenefit(i, 'description', e.target.value)} placeholder="Description" className="form-input w-full px-3 py-2 rounded-lg text-sm" />
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass-card border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5">SEO</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">SEO Title</label>
                <input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">SEO Description</label>
                <textarea value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} rows={3} className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none" />
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4">
            <button type="submit" disabled={saving}
              className="btn-shine flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-60">
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Update Service</>}
            </button>
            <button type="button" onClick={() => router.push('/admin/services')} className="px-8 py-3 border border-white/10 text-slate-400 hover:text-white rounded-xl transition-all">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
