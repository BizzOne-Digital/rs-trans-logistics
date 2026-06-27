'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, Layers, TrendingUp, Plus, Eye, Settings, Edit } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

interface DashboardData {
  totalQuotes: number;
  newQuotes: number;
  totalMessages: number;
  newMessages: number;
  totalServices: number;
  recentQuotes: Array<{ _id: string; fullName: string; freightType: string; status: string; createdAt: string; pickupLocation: string; deliveryLocation: string; }>;
  recentMessages: Array<{ _id: string; name: string; subject: string; status: string; createdAt: string; }>;
}

const statusColors: Record<string, string> = {
  new: 'status-new',
  'in-review': 'status-in-review',
  contacted: 'status-contacted',
  quoted: 'status-quoted',
  completed: 'status-completed',
  archived: 'status-archived',
  read: 'status-read',
  replied: 'status-replied',
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const cards = [
    { icon: FileText, label: 'Total Quote Requests', value: data?.totalQuotes ?? 0, badge: data?.newQuotes, badgeLabel: 'new', color: 'blue', href: '/admin/quotes' },
    { icon: MessageSquare, label: 'Contact Messages', value: data?.totalMessages ?? 0, badge: data?.newMessages, badgeLabel: 'new', color: 'orange', href: '/admin/messages' },
    { icon: Layers, label: 'Active Services', value: data?.totalServices ?? 0, color: 'green', href: '/admin/services' },
    { icon: TrendingUp, label: 'Total Inquiries', value: (data?.totalQuotes ?? 0) + (data?.totalMessages ?? 0), color: 'purple', href: '/admin/quotes' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="Dashboard" />
      <div className="flex-1 p-6">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 glass-card border border-white/5 rounded-2xl p-6 bg-gradient-to-r from-blue-900/20 to-transparent">
          <h2 className="text-white font-bold text-xl mb-1">Welcome to Blue River Logistics Admin</h2>
          <p className="text-slate-400 text-sm">Manage your website content, quote requests, and messages from here.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {cards.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link href={card.href}
                className="block glass-card border border-white/5 hover:border-blue-500/30 rounded-2xl p-5 transition-all premium-card">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    card.color === 'blue' ? 'bg-blue-600/20' : card.color === 'orange' ? 'bg-orange-500/20' : card.color === 'green' ? 'bg-green-500/20' : 'bg-purple-500/20'
                  }`}>
                    <card.icon className={`w-5 h-5 ${
                      card.color === 'blue' ? 'text-blue-400' : card.color === 'orange' ? 'text-orange-400' : card.color === 'green' ? 'text-green-400' : 'text-purple-400'
                    }`} />
                  </div>
                  {card.badge !== undefined && card.badge > 0 && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {card.badge} {card.badgeLabel}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-black text-white mb-1">
                  {loading ? <div className="h-8 w-12 bg-white/5 rounded animate-pulse" /> : card.value}
                </div>
                <p className="text-slate-400 text-sm">{card.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Quotes */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="glass-card border border-white/5 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <h3 className="text-white font-bold">Recent Quote Requests</h3>
                <Link href="/admin/quotes" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">View All</Link>
              </div>
              <div className="divide-y divide-white/5">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 animate-pulse">
                      <div className="h-4 bg-white/5 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-white/5 rounded w-1/2" />
                    </div>
                  ))
                ) : !data?.recentQuotes?.length ? (
                  <div className="p-8 text-center text-slate-500">No quote requests yet.</div>
                ) : (
                  data.recentQuotes.map((q) => (
                    <Link key={q._id} href={`/admin/quotes/${q._id}`}
                      className="block p-4 hover:bg-white/2 transition-colors admin-table-row">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium">{q.fullName}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[q.status] || 'status-new'}`}>
                          {q.status}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs">{q.freightType} · {q.pickupLocation} → {q.deliveryLocation}</p>
                      <p className="text-slate-600 text-xs mt-1">{new Date(q.createdAt).toLocaleDateString()}</p>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Recent Messages */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="glass-card border border-white/5 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <h3 className="text-white font-bold">Recent Contact Messages</h3>
                <Link href="/admin/messages" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">View All</Link>
              </div>
              <div className="divide-y divide-white/5">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 animate-pulse">
                      <div className="h-4 bg-white/5 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-white/5 rounded w-1/2" />
                    </div>
                  ))
                ) : !data?.recentMessages?.length ? (
                  <div className="p-8 text-center text-slate-500">No contact messages yet.</div>
                ) : (
                  data.recentMessages.map((m) => (
                    <Link key={m._id} href={`/admin/messages/${m._id}`}
                      className="block p-4 hover:bg-white/2 transition-colors admin-table-row">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium">{m.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[m.status] || 'status-new'}`}>
                          {m.status}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs truncate">{m.subject}</p>
                      <p className="text-slate-600 text-xs mt-1">{new Date(m.createdAt).toLocaleDateString()}</p>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="text-white font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Plus, label: 'Add Service', href: '/admin/services/new', color: 'blue' },
              { icon: Eye, label: 'View Quotes', href: '/admin/quotes', color: 'orange' },
              { icon: Settings, label: 'Update Contact', href: '/admin/settings', color: 'green' },
              { icon: Edit, label: 'Edit Hero', href: '/admin/content', color: 'purple' },
            ].map((action) => (
              <Link key={action.label} href={action.href}
                className="glass-card border border-white/5 hover:border-blue-500/30 rounded-xl p-4 text-center transition-all premium-card">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                  action.color === 'blue' ? 'bg-blue-600/20' : action.color === 'orange' ? 'bg-orange-500/20' : action.color === 'green' ? 'bg-green-500/20' : 'bg-purple-500/20'
                }`}>
                  <action.icon className={`w-5 h-5 ${
                    action.color === 'blue' ? 'text-blue-400' : action.color === 'orange' ? 'text-orange-400' : action.color === 'green' ? 'text-green-400' : 'text-purple-400'
                  }`} />
                </div>
                <p className="text-slate-300 text-sm font-medium">{action.label}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
