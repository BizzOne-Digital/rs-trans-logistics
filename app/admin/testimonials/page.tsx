'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, Trash2, Star, Edit, X, Save } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

interface Testimonial {
  _id: string; clientName: string; companyName: string;
  rating: number; text: string; isActive: boolean; sortOrder: number;
}

const emptyForm = { clientName: '', companyName: '', rating: 5, text: '', isActive: true, sortOrder: 0 };

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchTestimonials = () => {
    fetch('/api/admin/testimonials').then((r) => r.json())
      .then((d) => { setTestimonials(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(() => { fetchTestimonials(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/admin/testimonials/${editing._id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
        });
        toast.success('Testimonial updated');
      } else {
        await fetch('/api/admin/testimonials', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
        });
        toast.success('Testimonial added');
      }
      setShowForm(false); setEditing(null); setForm(emptyForm); fetchTestimonials();
    } catch { toast.error('Failed to save testimonial'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    toast.success('Deleted'); fetchTestimonials();
  };

  const startEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ clientName: t.clientName, companyName: t.companyName, rating: t.rating, text: t.text, isActive: t.isActive, sortOrder: t.sortOrder });
    setShowForm(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="Testimonials" />
      <div className="flex-1 p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6">
          <p className="text-slate-400 text-sm">{testimonials.length} testimonials</p>
          <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm); }}
            className="btn-shine flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all">
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </motion.div>

        {/* Form Modal */}
        {showForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card border border-blue-500/20 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">{editing ? 'Edit' : 'Add'} Testimonial</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Client Name *</label>
                <input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  required className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Company Name</label>
                <input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Rating (1-5)</label>
                <select value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                  className="form-input w-full px-4 py-3 rounded-xl text-sm bg-[#111827]">
                  {[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Sort Order</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) })}
                  className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-2">Testimonial Text *</label>
                <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
                  rows={4} required className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="tActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-blue-500" />
                <label htmlFor="tActive" className="text-slate-300 text-sm">Active (show on website)</label>
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" disabled={saving}
                  className="btn-shine flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all">
                  {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> {editing ? 'Update' : 'Add'}</>}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
                  className="px-6 py-2.5 border border-white/10 text-slate-400 hover:text-white rounded-xl text-sm transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="glass-card border border-white/5 rounded-2xl p-12 text-center text-slate-400">
              <Star className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No testimonials added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t._id} className="glass-card border border-white/5 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white font-bold">{t.clientName}</p>
                      <p className="text-slate-400 text-sm">{t.companyName || '—'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${t.isActive ? 'status-contacted' : 'status-archived'}`}>
                        {t.isActive ? 'Active' : 'Hidden'}
                      </span>
                      <div className="flex gap-1">
                        <button onClick={() => startEdit(t)} className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(t._id)} className="p-1.5 text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                    ))}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed italic">"{t.text}"</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
