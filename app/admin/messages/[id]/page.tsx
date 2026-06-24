'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

interface ContactMessage {
  _id: string; name: string; email: string; phone: string;
  subject: string; message: string; status: string; createdAt: string;
}

const statuses = ['new', 'read', 'replied', 'archived'];
const statusColors: Record<string, string> = {
  new: 'status-new', read: 'status-read', replied: 'status-replied', archived: 'status-archived',
};

export default function MessageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [msg, setMsg] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`/api/admin/contact-messages/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setMsg(d); setStatus(d.status);
        // Auto-mark as read
        if (d.status === 'new') {
          fetch(`/api/admin/contact-messages/${id}`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'read' }),
          });
        }
        setLoading(false);
      })
      .catch(() => router.push('/admin/messages'));
  }, [id, router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/admin/contact-messages/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update');
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this message?')) return;
    await fetch(`/api/admin/contact-messages/${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    router.push('/admin/messages');
  };

  if (loading) return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-[#070B12]">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!msg) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="Contact Message" />
      <div className="flex-1 p-6 max-w-4xl">
        <button onClick={() => router.push('/admin/messages')}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Messages
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-bold text-lg">{msg.subject}</h2>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusColors[msg.status]}`}>{msg.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: 'From', value: msg.name },
                  { label: 'Email', value: msg.email },
                  { label: 'Phone', value: msg.phone || '—' },
                  { label: 'Date', value: new Date(msg.createdAt).toLocaleString() },
                ].map((item) => (
                  <div key={item.label} className="glass p-3 rounded-xl">
                    <p className="text-slate-500 text-xs mb-1">{item.label}</p>
                    <p className="text-white text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="glass p-5 rounded-xl">
                <p className="text-slate-500 text-xs mb-3">Message</p>
                <p className="text-slate-300 leading-relaxed">{msg.message}</p>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="space-y-4">
            <div className="glass-card border border-white/5 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Update Status</h3>
              <select value={status} onChange={(e) => setStatus(e.target.value)}
                className="form-input w-full px-3 py-2.5 rounded-xl text-sm bg-[#111827] mb-4">
                {statuses.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
              <button onClick={handleSave} disabled={saving}
                className="btn-shine w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all">
                {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Status</>}
              </button>
              <button onClick={handleDelete}
                className="w-full flex items-center justify-center gap-2 border border-red-500/30 hover:border-red-500 text-red-400 font-medium py-2.5 rounded-xl text-sm transition-all mt-3">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
            <div className="glass-card border border-white/5 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-3 text-sm">Reply</h3>
              <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                className="btn-shine w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 rounded-xl text-sm transition-all">
                Reply via Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
