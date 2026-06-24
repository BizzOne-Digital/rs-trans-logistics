'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Eye, EyeOff, Layers } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

interface Service {
  _id: string; title: string; slug: string; icon: string;
  shortDescription: string; isActive: boolean; sortOrder: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = () => {
    fetch('/api/admin/services')
      .then((r) => r.json())
      .then((d) => { setServices(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchServices(); }, []);

  const toggleActive = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/admin/services/${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current }),
      });
      toast.success(current ? 'Service hidden' : 'Service shown');
      fetchServices();
    } catch { toast.error('Failed to update'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service? This will remove it from the website.')) return;
    await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
    toast.success('Service deleted');
    fetchServices();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="Manage Services" />
      <div className="flex-1 p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6">
          <p className="text-slate-400 text-sm">{services.length} services configured</p>
          <Link href="/admin/services/new"
            className="btn-shine flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all">
            <Plus className="w-4 h-4" /> Add Service
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card border border-white/5 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : services.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <Layers className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="mb-4">No services added yet. Add your first service.</p>
              <Link href="/admin/services/new" className="btn-shine inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-5 py-2.5 rounded-xl text-sm">
                <Plus className="w-4 h-4" /> Add Service
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Order', 'Service', 'Slug', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {services.map((s) => (
                  <tr key={s._id} className="admin-table-row">
                    <td className="px-5 py-4 text-slate-400 text-sm">{s.sortOrder}</td>
                    <td className="px-5 py-4">
                      <p className="text-white font-medium">{s.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5 truncate max-w-xs">{s.shortDescription}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-sm font-mono">/{s.slug}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.isActive ? 'status-contacted' : 'status-archived'}`}>
                        {s.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/services/${s._id}/edit`}
                          className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button onClick={() => toggleActive(s._id, s.isActive)}
                          className="p-1.5 text-slate-400 hover:text-orange-400 transition-colors" title={s.isActive ? 'Hide' : 'Show'}>
                          {s.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <Link href={`/services/${s.slug}`} target="_blank"
                          className="p-1.5 text-slate-400 hover:text-green-400 transition-colors" title="View on website">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(s._id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </div>
    </div>
  );
}
