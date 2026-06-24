'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Search, Trash2, Eye, MessageSquare } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

interface ContactMessage {
  _id: string; name: string; email: string; phone: string;
  subject: string; message: string; status: string; createdAt: string;
}

const statusColors: Record<string, string> = {
  new: 'status-new', read: 'status-read', replied: 'status-replied', archived: 'status-archived',
};

const statuses = ['all', 'new', 'read', 'replied', 'archived'];

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchMessages = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (statusFilter !== 'all') params.set('status', statusFilter);
    fetch(`/api/admin/contact-messages?${params}`)
      .then((r) => r.json())
      .then((d) => { setMessages(d.messages || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, [search, statusFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await fetch(`/api/admin/contact-messages/${id}`, { method: 'DELETE' });
    toast.success('Message deleted');
    fetchMessages();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="Contact Messages" />
      <div className="flex-1 p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card border border-white/5 rounded-2xl p-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search by name, email, subject..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="form-input w-full pl-9 pr-4 py-2.5 rounded-xl text-sm" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input px-4 py-2.5 rounded-xl text-sm bg-[#111827]">
              {statuses.map((s) => <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <h3 className="text-white font-bold">Contact Messages ({messages.length})</h3>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : messages.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No contact messages yet.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {['Name', 'Email', 'Subject', 'Message Preview', 'Status', 'Date', 'Actions'].map((h) => (
                      <th key={h} className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {messages.map((m) => (
                    <tr key={m._id} className="admin-table-row">
                      <td className="px-5 py-3 text-white text-sm font-medium">{m.name}</td>
                      <td className="px-5 py-3 text-slate-400 text-sm">{m.email}</td>
                      <td className="px-5 py-3 text-slate-300 text-sm">{m.subject}</td>
                      <td className="px-5 py-3 text-slate-500 text-xs max-w-xs truncate">{m.message}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[m.status] || 'status-new'}`}>{m.status}</span>
                      </td>
                      <td className="px-5 py-3 text-slate-500 text-xs">{new Date(m.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/messages/${m._id}`} className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDelete(m._id)} className="p-1.5 text-slate-400 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
