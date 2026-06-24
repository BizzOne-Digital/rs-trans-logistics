'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Heart, MapPin, CheckCircle } from 'lucide-react';

const values = [
  { icon: '🛡️', title: 'Reliability',          desc: 'We show up on time, every time. Your freight schedule matters to us.' },
  { icon: '⚠️',  title: 'Safety',               desc: 'Every shipment is handled with the highest safety standards throughout the journey.' },
  { icon: '📡',  title: 'Communication',        desc: 'Clear, professional communication from booking through to delivery.' },
  { icon: '🔄',  title: 'Flexibility',          desc: 'We work with your needs, not the other way around. Custom solutions for every load.' },
  { icon: '🏆',  title: 'Professional Service', desc: 'Business-grade logistics support delivered with care and expertise.' },
];

import { Easing } from 'framer-motion';

const EASE: Easing = 'easeOut';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: EASE },
});

export default function AboutPage() {
  return (
    <div className="bg-[#070B12]">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-36 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp(0)}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-400 border border-blue-500/30 rounded-full px-4 py-2 mb-6 glass">
            🇨🇦 Based in Surrey, BC
          </motion.div>
          <motion.h1 {...fadeUp(0.15)} className="heading-xl text-white mb-6">
            About <span className="gradient-text">RS Trans Logistics</span>
          </motion.h1>
          <motion.p {...fadeUp(0.3)} className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            A full-service trucking company based in Surrey, BC, serving freight needs across Canada and the USA.
          </motion.p>
        </div>
      </section>

      {/* ── COMPANY OVERVIEW ──────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0)}>
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">Who We Are</span>
            <h2 className="heading-md text-white mt-3 mb-6">Canada-USA Freight Specialists</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              We are a full-service trucking company based in Surrey, British Columbia, providing reliable transportation solutions between Canada and the United States. Our focus is simple: move freight safely, professionally, and efficiently while giving businesses the communication and flexibility they need.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              From dry vans and reefers to flatbeds, step decks, containers, and intermodal freight, we support a wide range of transportation needs with dependable service and quote-based solutions.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {['Full-Service Freight Solutions', 'Canada & USA Routes', 'Business-to-Business Focus', 'Quote-Based Flexible Pricing'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <Link href="/quote" className="btn-shine inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.15)}>
            <div className="glass-card border border-white/5 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="text-6xl mb-6">🚛</div>
                <h3 className="text-white font-bold text-xl mb-4">RS Trans Logistics</h3>
                <div className="space-y-3">
                  {[
                    { icon: <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />, title: 'Headquarters', value: '12542 Grove Crescent, Surrey, BC V3V 2L7' },
                    { icon: <span className="text-xl leading-none">🌎</span>, title: 'Service Area', value: 'Canada & United States of America' },
                    { icon: <span className="text-xl leading-none">👤</span>, title: 'Contact Person', value: 'Rajneel Sampat' },
                  ].map((row) => (
                    <div key={row.title} className="flex items-start gap-3 glass p-3 rounded-xl">
                      {row.icon}
                      <div>
                        <p className="text-white text-sm font-medium">{row.title}</p>
                        <p className="text-slate-400 text-sm">{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#111827]/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-orange-400" />
            </div>
            <span className="text-orange-400 text-sm font-bold uppercase tracking-widest">Our Mission</span>
            <h2 className="heading-md text-white mt-3 mb-8">What Drives Us Forward</h2>
            <blockquote className="text-xl md:text-2xl text-slate-300 leading-relaxed border-l-4 border-blue-500 pl-8 text-left max-w-3xl mx-auto italic">
              &ldquo;To provide reliable, flexible, and professional trucking services that help businesses move freight with confidence across Canada and the USA.&rdquo;
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">Our Core Values</span>
            <h2 className="heading-md text-white mt-3">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} {...fadeUp(i * 0.07)}>
                <div className="glass-card border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 text-center premium-card h-full">
                  <span className="text-4xl block mb-4">{v.icon}</span>
                  <h3 className="text-white font-bold mb-3">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ──────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#111827]/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp(0)}>
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">Our Location</span>
            <h2 className="heading-md text-white mt-3 mb-6">Based in Surrey, British Columbia</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Strategically located in Surrey, BC, we are well-positioned to serve freight routes between Canada and the United States, providing timely pickups and efficient cross-border transportation.
            </p>
            <div className="glass-card border border-white/5 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium mb-1">Office Address</p>
                  <p className="text-slate-400 text-sm">12542 Grove Crescent, Surrey, BC V3V 2L7, Canada</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="glass px-4 py-2 rounded-full text-sm text-blue-400 border border-blue-500/20">🇨🇦 Canada Routes</span>
              <span className="glass px-4 py-2 rounded-full text-sm text-orange-400 border border-orange-500/20">🇺🇸 USA Routes</span>
              <span className="glass px-4 py-2 rounded-full text-sm text-slate-300 border border-white/10">Surrey, BC Base</span>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.15)}>
            <div className="glass-card border border-white/5 rounded-2xl overflow-hidden h-64 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-5xl mb-3">📍</div>
                  <p className="text-white font-bold">Surrey, BC</p>
                  <p className="text-slate-400 text-sm mb-4">British Columbia, Canada</p>
                  <a href="https://maps.google.com/?q=12542+Grove+Crescent+Surrey+BC"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                    View on Google Maps <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-transparent to-orange-900/10 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <h2 className="heading-lg text-white mb-6">Ready to Move Your Freight?</h2>
            <p className="text-slate-400 text-lg mb-10">Get in touch with our team and receive a custom freight quote for your shipment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="btn-shine flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all neon-blue">
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all hover:bg-white/5">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
