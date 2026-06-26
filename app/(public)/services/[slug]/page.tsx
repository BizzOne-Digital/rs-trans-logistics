'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Truck, Thermometer, Package, Layers, Container, GitMerge, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  truck: Truck, thermometer: Thermometer, package: Package,
  layers: Layers, container: Container, 'git-merge': GitMerge,
};

// Map slug → hero image + gallery images
const serviceImages: Record<string, { hero: string; gallery: string[] }> = {
  'dry-vans': {
    hero: '/images/services/dryvans-2.jpg',
    gallery: ['/images/services/dryvans-1.jpg', '/images/services/dryvans-3.jpg'],
  },
  'reefer-service': {
    hero: '/images/services/reefer-1.jpg',
    gallery: ['/images/services/reefer-2.jpg', '/images/services/reefer-3.jpg'],
  },
  'flatbed-curtain-roll-tite': {
    hero: '/images/services/flatbed-1.jpg',
    gallery: ['/images/services/flatbed-2.jpg', '/images/services/flatbed-3.jpg'],
  },
  'step-deck': {
    hero: '/images/services/stepdeck-1.jpg',
    gallery: ['/images/services/stepdeck-2.jpg', '/images/services/stepdeck-3.jpg'],
  },
  'container-service': {
    hero: '/images/services/container-1.jpg',
    gallery: ['/images/services/container-2.jpg', '/images/services/container-3.jpg'],
  },
  'intermodal': {
    hero: '/images/services/intermodal-1.jpg',
    gallery: ['/images/services/intermodal-2.jpg', '/images/services/intermodal-3.jpg'],
  },
};

interface Benefit { title: string; description: string; }
interface ProcessStep { step: number; title: string; description: string; }

interface Service {
  _id: string; title: string; slug: string; icon: string;
  shortDescription: string; detailedDescription: string;
  bestFor: string[]; benefits: Benefit[];
  processSteps: ProcessStep[]; relatedServices: string[];
  seoTitle: string; seoDescription: string;
}

interface RelatedService {
  _id: string; title: string; slug: string; icon: string; shortDescription: string;
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [related, setRelated] = useState<RelatedService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/services/${slug}`)
      .then((r) => { if (!r.ok) throw new Error('not found'); return r.json(); })
      .then(async (data: Service) => {
        setService(data);
        if (data.relatedServices?.length) {
          const all: RelatedService[] = await fetch('/api/services').then((r) => r.json());
          setRelated(all.filter((s) => data.relatedServices.includes(s.slug)).slice(0, 3));
        }
        setLoading(false);
      })
      .catch(() => router.push('/services'));
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070B12] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) return null;

  const Icon = iconMap[service.icon] || Truck;
  const imgs = serviceImages[service.slug] || { hero: '', gallery: [] };

  return (
    <div className="bg-[#070B12]">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-36 pb-20 px-4 overflow-hidden min-h-[60vh] flex items-center">
        {/* Hero background image */}
        {imgs.hero && (
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${imgs.hero}')` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B12]/70 via-[#070B12]/50 to-[#070B12]" />
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 w-full">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-slate-300 transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">{service.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-blue-600/30 backdrop-blur rounded-2xl flex items-center justify-center border border-blue-500/30">
                  <Icon className="w-7 h-7 text-blue-400" />
                </div>
                <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">Freight Service</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }} className="heading-xl text-white mb-6">
                {service.title}
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-slate-300 text-lg leading-relaxed mb-8">
                {service.shortDescription}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row gap-3">
                <Link href={`/quote?service=${service.slug}`}
                  className="btn-shine flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all neon-blue">
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/services"
                  className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:bg-white/5">
                  All Services
                </Link>
              </motion.div>
            </div>

            {/* Best For card */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}>
              <div className="glass-card border border-white/10 rounded-2xl p-8">
                <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-400" /> Best For
                </h3>
                <div className="space-y-3">
                  {service.bestFor?.map((item) => (
                    <div key={item} className="flex items-center gap-3 glass p-3 rounded-xl border border-white/5">
                      <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ──────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#111827]/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">Service Overview</span>
              <h2 className="heading-md text-white mt-3 mb-6">About {service.title}</h2>
              <p className="text-slate-400 text-lg leading-relaxed">{service.detailedDescription}</p>
            </ScrollReveal>

            {/* Gallery image 1 */}
            {imgs.gallery[0] && (
              <ScrollReveal delay={0.15}>
                <div className="rounded-2xl overflow-hidden h-64 md:h-80">
                  <div className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${imgs.gallery[0]}')` }} />
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <span className="text-orange-400 text-sm font-bold uppercase tracking-widest">Key Benefits</span>
            <h2 className="heading-md text-white mt-3">Why Choose This Service</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits?.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.1}>
                <div className="glass-card border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 premium-card h-full">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{b.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{b.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────── */}
      {service.processSteps?.length > 0 && (
        <section className="py-20 px-4 bg-[#111827]/40 relative overflow-hidden">
          {/* Gallery image 2 as background */}
          {imgs.gallery[1] && (
            <div className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: `url('${imgs.gallery[1]}')` }} />
          )}
          <div className="absolute inset-0 bg-[#111827]/80" />
          <div className="absolute inset-0 bg-grid opacity-5" />

          <div className="max-w-5xl mx-auto relative z-10">
            <ScrollReveal className="text-center mb-12">
              <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">Service Process</span>
              <h2 className="heading-md text-white mt-3">How It Works</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {service.processSteps.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="w-14 h-14 glass-card border-2 border-blue-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-400 font-black">0{step.step}</span>
                    </div>
                    <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{step.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED SERVICES ──────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-12">
              <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">More Solutions</span>
              <h2 className="heading-md text-white mt-3">Related Services</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((s, i) => {
                const RIcon = iconMap[s.icon] || Truck;
                const rImgs = serviceImages[s.slug];
                return (
                  <ScrollReveal key={s._id} delay={i * 0.1}>
                    <div className="glass-card border border-white/5 hover:border-blue-500/30 rounded-2xl overflow-hidden premium-card group">
                      {rImgs?.hero && (
                        <div className="h-40 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                          style={{ backgroundImage: `url('${rImgs.hero}')` }} />
                      )}
                      <div className="p-6">
                        <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-600/30 transition-colors">
                          <RIcon className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="text-white font-bold mb-2">{s.title}</h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{s.shortDescription}</p>
                        <Link href={`/services/${s.slug}`}
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                          Learn More <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── QUOTE CTA ─────────────────────────────────────── */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-orange-900/10 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="heading-md text-white mb-4">Ready to Ship with {service.title}?</h2>
            <p className="text-slate-400 text-lg mb-8">
              Get a custom quote for your {service.title.toLowerCase()} shipment today.
            </p>
            <Link href={`/quote?service=${service.slug}`}
              className="btn-shine inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all neon-blue">
              Request a Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
