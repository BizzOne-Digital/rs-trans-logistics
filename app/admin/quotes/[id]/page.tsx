'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

interface QuoteRequest {
  _id: string; fullName: string; companyName: string; phone: string; email: string;
  pickupLocation: string; deliveryLocation: string; freightType: string;
  pickupDate: string; deliveryDate: string; freightWeight: string; freightDimensions: string;
  message: string; status: string; internalNotes: string; createdAt: string;
}

const statuses = ['new', 'in-review', 'contacted', 'quoted', 'completed', 'archived'];
const statusColors: Record<string, string> = {
  new: 'status-new', 'in-review': 'status-in-review', contacted: 'status-contacted',
  quoted: 'status-quoted', completed: 'status-completed', archived: 'status-archived',
};

export default function QuoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetch(`/api/admin/quote-requests/${id}`)
      .then((r) => r.json())
      .then((d) => { setQuote(d); setStatus(d.status); setNotes(d.internalNotes || ''); setLoading(false); })
      .catch(() => { router.push('/admin/quotes'); });
  }, [id, router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/admin/quote-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, internalNotes: notes }),
      });
      toast.success('Quote updated successfully');
    } catch {
      toast.error('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this quote request?')) return;
    await fetch(`/api/admin/quote-requests/${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    router.push('/admin/quotes');
  };

  if (loading) return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-[#070B12]">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!quote) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="Quote Request Detail" />
      <div className="flex-1 p-6 max-w-5xl">
        <button onClick={() => router.push('/admin/quotes')}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Quotes
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-bold text-lg">{quote.fullName}</h2>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusColors[quote.status]}`}>{quote.status}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Company', value: quote.companyName || '—' },
                  { label: 'Phone', value: quote.phone },
                  { label: 'Email', value: quote.email },
                  { label: 'Freight Type', value: quote.freightType },
                  { label: 'Pickup Location', value: quote.pickupLocation },
                  { label: 'Delivery Location', value: quote.deliveryLocation },
                  { label: 'Pickup Date', value: quote.pickupDate || '—' },
                  { label: 'Delivery Date', value: quote.deliveryDate || '—' },
                  { label: 'Freight Weight', value: quote.freightWeight || '—' },
                  { label: 'Dimensions', value: quote.freightDimensions || '—' },
                ].map((item) => (
                  <div key={item.label} className="glass p-3 rounded-xl">
                    <p className="text-slate-500 text-xs mb-1">{item.label}</p>
                    <p className="text-white text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
              {quote.message && (
                <div className="mt-4 glass p-4 rounded-xl">
                  <p className="text-slate-500 text-xs mb-2">Message</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{quote.message}</p>
                </div>
              )}
              <p className="text-slate-600 text-xs mt-4">Submitted: {new Date(quote.createdAt).toLocaleString()}</p>
            </motion.div>
          </div>

          {/* Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="space-y-5">
            <div className="glass-card border border-white/5 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Update Status</h3>
              <select value={status} onChange={(e) => setStatus(e.target.value)}
                className="form-input w-full px-3 py-2.5 rounded-xl text-sm bg-[#111827] mb-4">
                {statuses.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
              <h3 className="text-white font-bold mb-3">Internal Notes</h3>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                rows={5} placeholder="Add internal notes..."
                className="form-input w-full px-3 py-2.5 rounded-xl text-sm resize-none mb-4" />
              <button onClick={handleSave} disabled={saving}
                className="btn-shine w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all disabled:opacity-60">
                {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Changes</>}
              </button>
              <button onClick={handleDelete}
                className="w-full flex items-center justify-center gap-2 border border-red-500/30 hover:border-red-500 text-red-400 hover:text-red-300 font-medium py-2.5 rounded-xl text-sm transition-all mt-3">
                <Trash2 className="w-4 h-4" /> Delete Quote
              </button>
            </div>

            <div className="glass-card border border-white/5 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-3 text-sm">Quick Contact</h3>
              <a href={`mailto:${quote.email}`} className="block text-blue-400 hover:text-blue-300 text-sm transition-colors mb-2">
                📧 {quote.email}
              </a>
              <a href={`tel:${quote.phone}`} className="block text-blue-400 hover:text-blue-300 text-sm transition-colors">
                📞 {quote.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
