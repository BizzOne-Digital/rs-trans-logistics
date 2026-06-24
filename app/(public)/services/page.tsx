'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Truck, Thermometer, Package, Layers, Container, GitMerge } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  truck: Truck, thermometer: Thermometer, package: Package,
  layers: Layers, container: Container, 'git-merge': GitMerge,
};

const filters = ['All', 'General Freight', 'Temperature Controlled', 'Oversized Freight', 'Container Freight', 'Long Distance'];

const serviceCategories: Record<string, string[]> = {
  'dry-vans':               ['General Freight', 'Long Distance'],
  'reefer-service':         ['Temperature Controlled', 'Long Distance'],
  'flatbed-curtain-roll-tite': ['General Freight', 'Oversized Freight'],
  'step-deck':              ['Oversized Freight', 'Long Distance'],
  'container-service':      ['Container Freight', 'Long Distance'],
  'intermodal':             ['Container Freight', 'Long Distance'],
};

interface Service {
  _id: string; title: string; slug: string; icon: string;
  shortDescription: string; isActive: boolean; sortOrder: number;
}

export default function ServicesPage() {
  const [services, setServices]       = useState<Service[]>([]);
  const [search, setSearch]           = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');

  useEffect(() => {
    fetch('/api/services')
      .then((r) => { if (!r.ok) throw new Error('Failed'); return r.json(); })
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  const filtered = services.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
                        s.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || (serviceCategories[s.slug] || []).includes(activeFilter);
    return matchSearch && matchFilter;
  });

  return (
    <div className="bg-[#070B12]">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-36 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-400 border border-blue-500/30 rounded-full px-4 py-2 mb-6 glass">
            🚛 Freight Solutions
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="heading-xl text-white mb-6">
            Complete <span className="gradient-text">Trucking Services</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto">
            Flexible freight transportation solutions for businesses moving loads across Canada and the USA.
          </motion.p>
        </div>
      </section>

      {/* ── FILTERS ───────────────────────────────────────── */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search services..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="form-input w-full pl-10 pr-4 py-3 rounded-xl text-sm" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {filters.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === f ? 'bg-blue-600 text-white' : 'glass border border-white/10 text-slate-400 hover:text-white'
                  }`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────── */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 h-64 animate-pulse border border-white/5">
                  <div className="w-12 h-12 bg-white/5 rounded-xl mb-4" />
                  <div className="h-4 bg-white/5 rounded mb-3 w-3/4" />
                  <div className="h-3 bg-white/5 rounded mb-2" />
                  <div className="h-3 bg-white/5 rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">Failed to load services.</p>
              <button onClick={() => window.location.reload()}
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg">No services found matching your search.</p>
              <button onClick={() => { setSearch(''); setActiveFilter('All'); }}
                className="mt-3 text-blue-400 hover:text-blue-300 text-sm transition-colors">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s, i) => {
                const Icon = iconMap[s.icon] || Truck;
                return (
                  <motion.div key={s._id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="glass-card border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 premium-card group h-full flex flex-col transition-all duration-300">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                        <Icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="mb-2">
                        <span className="text-xs text-orange-400 font-medium uppercase tracking-wider glass px-2 py-1 rounded-full border border-orange-500/20">
                          {(serviceCategories[s.slug] || ['Freight'])[0]}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-3 mt-2">{s.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">{s.shortDescription}</p>
                      <div className="flex gap-2 mt-auto">
                        <Link href={`/services/${s.slug}`}
                          className="flex-1 text-center text-sm border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-white py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-1">
                          View Details <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link href={`/quote?service=${s.slug}`}
                          className="flex-1 text-center text-sm bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white py-2.5 rounded-lg transition-all duration-200">
                          Get Quote
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#111827]/40 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-md text-white mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-slate-400 mb-8">Contact us and our team will recommend the right freight solution for your shipment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn-shine flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-all">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-3 rounded-xl transition-all hover:bg-white/5">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
