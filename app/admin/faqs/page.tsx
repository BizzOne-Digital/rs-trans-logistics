'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, Trash2, Edit, HelpCircle, X, Save, ChevronDown, ChevronUp } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

interface FAQ {
  _id: string; question: string; answer: string; category: string;
  sortOrder: number; isActive: boolean;
}

const emptyForm = { question: '', answer: '', category: 'General', sortOrder: 0, isActive: true };

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchFAQs = () => {
    fetch('/api/admin/faqs').then((r) => r.json())
      .then((d) => { setFaqs(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(() => { fetchFAQs(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/admin/faqs/${editing._id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
        });
        toast.success('FAQ updated');
      } else {
        await fetch('/api/admin/faqs', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
        });
        toast.success('FAQ added');
      }
      setShowForm(false); setEditing(null); setForm(emptyForm); fetchFAQs();
    } catch { toast.error('Failed to save FAQ'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
    toast.success('Deleted'); fetchFAQs();
  };

  const startEdit = (f: FAQ) => {
    setEditing(f);
    setForm({ question: f.question, answer: f.answer, category: f.category, sortOrder: f.sortOrder, isActive: f.isActive });
    setShowForm(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="FAQ Management" />
      <div className="flex-1 p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6">
          <p className="text-slate-400 text-sm">{faqs.length} FAQs</p>
          <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm); }}
            className="btn-shine flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-sm">
            <Plus className="w-4 h-4" /> Add FAQ
          </button>
        </motion.div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card border border-blue-500/20 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">{editing ? 'Edit' : 'Add'} FAQ</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="form-input w-full px-4 py-3 rounded-xl text-sm" placeholder="General" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Sort Order</label>
                  <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) })}
                    className="form-input w-full px-4 py-3 rounded-xl text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Question *</label>
                <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })}
                  required className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Answer *</label>
                <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  rows={4} required className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="fActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-blue-500" />
                <label htmlFor="fActive" className="text-slate-300 text-sm">Active (show on website)</label>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving}
                  className="btn-shine flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm">
                  {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save</>}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
                  className="px-6 py-2.5 border border-white/10 text-slate-400 hover:text-white rounded-xl text-sm">Cancel</button>
              </div>
            </form>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : faqs.length === 0 ? (
            <div className="glass-card border border-white/5 rounded-2xl p-12 text-center text-slate-400">
              <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No FAQs added yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq._id} className="glass-card border border-white/5 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpanded(expanded === faq._id ? null : faq._id)}>
                    <div className="flex items-center gap-3 flex-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${faq.isActive ? 'status-contacted' : 'status-archived'}`}>
                        {faq.isActive ? 'Active' : 'Hidden'}
                      </span>
                      <span className="text-xs text-slate-500 glass px-2 py-0.5 rounded-full">{faq.category}</span>
                      <p className="text-white font-medium text-sm">{faq.question}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <button onClick={(e) => { e.stopPropagation(); startEdit(faq); }} className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(faq._id); }} className="p-1.5 text-slate-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {expanded === faq._id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>
                  {expanded === faq._id && (
                    <div className="px-4 pb-4 border-t border-white/5 pt-3">
                      <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
