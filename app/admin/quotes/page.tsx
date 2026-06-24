'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Search, Trash2, Eye, Filter } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

interface QuoteRequest {
  _id: string; fullName: string; companyName: string; phone: string; email: string;
  pickupLocation: string; deliveryLocation: string; freightType: string;
  status: string; createdAt: string;
}

const statusColors: Record<string, string> = {
  new: 'status-new', 'in-review': 'status-in-review', contacted: 'status-contacted',
  quoted: 'status-quoted', completed: 'status-completed', archived: 'status-archived',
};

const statuses = ['all', 'new', 'in-review', 'contacted', 'quoted', 'completed', 'archived'];
const freightTypes = ['all', 'Dry Van', 'Reefer Service', 'Flatbed / Curtain Van / Roll Tite', 'Step Deck', 'Container Service', 'Intermodal', 'Other'];

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [freightFilter, setFreightFilter] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchQuotes = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (freightFilter !== 'all') params.set('freightType', freightFilter);

    fetch(`/api/admin/quote-requests?${params}`)
      .then((r) => r.json())
      .then((d) => { setQuotes(d.quotes || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchQuotes(); }, [search, statusFilter, freightFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this quote request? This cannot be undone.')) return;
    try {
      await fetch(`/api/admin/quote-requests/${id}`, { method: 'DELETE' });
      toast.success('Quote request deleted');
      fetchQuotes();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="Quote Requests" />
      <div className="flex-1 p-6">
        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card border border-white/5 rounded-2xl p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search by name, email, company..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="form-input w-full pl-9 pr-4 py-2.5 rounded-xl text-sm" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input px-4 py-2.5 rounded-xl text-sm bg-[#111827]">
              {statuses.map((s) => <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
            <select value={freightFilter} onChange={(e) => setFreightFilter(e.target.value)}
              className="form-input px-4 py-2.5 rounded-xl text-sm bg-[#111827]">
              {freightTypes.map((t) => <option key={t} value={t}>{t === 'all' ? 'All Freight Types' : t}</option>)}
            </select>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-white font-bold">All Quote Requests ({quotes.length})</h3>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : quotes.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <Filter className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No quote requests yet.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {['Name', 'Company', 'Freight Type', 'Route', 'Status', 'Date', 'Actions'].map((h) => (
                      <th key={h} className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {quotes.map((q) => (
                    <tr key={q._id} className="admin-table-row">
                      <td className="px-5 py-3">
                        <div className="text-white text-sm font-medium">{q.fullName}</div>
                        <div className="text-slate-500 text-xs">{q.email}</div>
                      </td>
                      <td className="px-5 py-3 text-slate-400 text-sm">{q.companyName || '—'}</td>
                      <td className="px-5 py-3">
                        <span className="text-xs glass px-2 py-1 rounded-full text-blue-400 border border-blue-500/20">{q.freightType}</span>
                      </td>
                      <td className="px-5 py-3 text-slate-400 text-xs">
                        {q.pickupLocation} → {q.deliveryLocation}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[q.status] || 'status-new'}`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-500 text-xs">{new Date(q.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/quotes/${q._id}`}
                            className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDelete(q._id)}
                            className="p-1.5 text-slate-400 hover:text-red-400 transition-colors">
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
