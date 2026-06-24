'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Shield, Clock, Award, Users,
  CheckCircle, Truck, Thermometer, Package, Layers, Container, GitMerge, Star
} from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

/* ── Reusable reveal wrapper using whileInView ─────── */
function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const PARTICLES = [
  { left: '10%', top: '15%', opacity: 0.4, yDist: -45, duration: 4.2, delay: 0   },
  { left: '25%', top: '40%', opacity: 0.5, yDist: -60, duration: 5.1, delay: 0.5 },
  { left: '42%', top: '70%', opacity: 0.3, yDist: -35, duration: 3.8, delay: 1.0 },
  { left: '58%', top: '20%', opacity: 0.6, yDist: -55, duration: 6.0, delay: 0.3 },
  { left: '75%', top: '55%', opacity: 0.4, yDist: -40, duration: 4.5, delay: 1.2 },
  { left: '88%', top: '30%', opacity: 0.5, yDist: -50, duration: 5.5, delay: 0.7 },
  { left: '5%',  top: '80%', opacity: 0.3, yDist: -30, duration: 3.5, delay: 1.5 },
  { left: '33%', top: '10%', opacity: 0.6, yDist: -65, duration: 6.2, delay: 0.2 },
  { left: '65%', top: '85%', opacity: 0.4, yDist: -42, duration: 4.8, delay: 0.9 },
  { left: '92%', top: '60%', opacity: 0.3, yDist: -38, duration: 3.9, delay: 1.8 },
  { left: '18%', top: '50%', opacity: 0.5, yDist: -52, duration: 5.3, delay: 0.4 },
  { left: '50%', top: '35%', opacity: 0.4, yDist: -44, duration: 4.1, delay: 1.1 },
];

const services = [
  { icon: Truck,       title: 'Dry Vans',                               slug: 'dry-vans',                desc: 'Secure enclosed trailer transportation for general freight and packaged goods across Canada & USA.' },
  { icon: Thermometer, title: 'Reefer Service',                         slug: 'reefer-service',           desc: 'Temperature-controlled freight solutions for products requiring climate consistency.' },
  { icon: Package,     title: 'Flatbed Tarp, Curtain Vans & Roll Tite', slug: 'flatbed-curtain-roll-tite',desc: 'Flexible freight solutions for oversized, covered, or specialized loads.' },
  { icon: Layers,      title: 'Step Deck',                              slug: 'step-deck',               desc: 'Specialized hauling for taller or oversized freight requiring lower deck height.' },
  { icon: Container,   title: 'Container Service',                      slug: 'container-service',        desc: 'Reliable container transportation for import, export, and commercial logistics.' },
  { icon: GitMerge,    title: 'Intermodal',                             slug: 'intermodal',              desc: 'Efficient freight movement using multiple transportation methods for long-distance routes.' },
];

const whyUs = [
  { icon: Shield, title: 'Full-Service Freight Support', desc: 'From pickup to delivery, we handle every aspect of your shipment with care and precision.' },
  { icon: Award,  title: 'Cross-Border Focus',           desc: 'Specialized in Canada-USA freight with knowledge of cross-border requirements and routes.' },
  { icon: Clock,  title: 'Flexible Quote-Based Pricing', desc: 'Custom quotes for every shipment — no hidden fees, just transparent pricing.' },
  { icon: Users,  title: 'Safe & Dependable Transport',  desc: 'Your freight is handled with the highest safety standards throughout every journey.' },
];

const steps = [
  { num: '01', title: 'Send Your Freight Details', desc: 'Fill out our quote form with your pickup, delivery, and cargo information.' },
  { num: '02', title: 'Get a Custom Quote',        desc: 'Our team reviews your details and provides a tailored freight quote.' },
  { num: '03', title: 'Schedule Pickup',           desc: 'Confirm your booking and we schedule pickup at your convenience.' },
  { num: '04', title: 'Freight Moves Safely',      desc: 'Your shipment is transported safely across the Canada-USA route.' },
  { num: '05', title: 'Delivery Completed',        desc: 'Freight delivered to your destination. Job done.' },
];

export default function HomePageClient() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div suppressHydrationWarning className="bg-[#070B12]">

      {/* ═══ HERO ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">

        {/* Parallax background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B12]/60 via-[#070B12]/40 to-[#070B12] z-10" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 60%, rgba(37,99,235,0.15) 0%, transparent 70%),
                              radial-gradient(ellipse 40% 30% at 80% 40%, rgba(249,115,22,0.08) 0%, transparent 60%)`,
          }} />
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {PARTICLES.map((p, i) => (
            <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-blue-400"
              style={{ left: p.left, top: p.top, opacity: p.opacity }}
              animate={{ y: [0, p.yDist, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            />
          ))}
        </div>

        {/* Light streaks */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {[150, 230, 180, 260].map((w, i) => (
            <motion.div key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
              style={{ width: `${w}px`, top: `${20 + i * 18}%` }}
              animate={{ x: ['-200px', '110vw'], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, repeatDelay: 3 + i * 1.5, delay: i * 0.8 }}
            />
          ))}
        </div>

        {/* Bottom route line */}
        <div className="absolute bottom-0 left-0 right-0 h-px z-20 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Hero content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-400 border border-blue-500/30 rounded-full px-4 py-2 mb-8 glass">
            <span>🇨🇦</span><span>Canada • USA Freight Solutions</span><span>🇺🇸</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="heading-xl text-white mb-6 leading-tight">
            Full-Service Trucking{' '}
            <span className="gradient-text">Between Canada</span>
            <br />& the USA
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Reliable freight transportation solutions built for businesses that need speed, safety, and consistency across borders.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/quote" className="btn-shine group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all neon-blue w-full sm:w-auto justify-center">
              Request a Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/services" className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:bg-white/5 w-full sm:w-auto justify-center">
              Explore Services
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-4 pb-16">
            {['Cross-Border Freight', 'Full-Service Trucking', 'Quote-Based Solutions'].map((badge) => (
              <span key={badge} className="flex items-center gap-2 text-sm text-slate-400 glass px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-blue-400" />{badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-6 h-6 text-slate-500" />
          </motion.div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16 md:h-24 bg-[#070B12]" />

      {/* ═══ STATS BAR ═════════════════════════════════════ */}
      <section className="relative z-10 border-y border-white/5 bg-[#111827]/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 6,   suffix: '+',        label: 'Service Types'       },
              { value: 2,   suffix: ' Nations',  label: 'Canada & USA'        },
              { value: 100, suffix: '%',         label: 'Quote-Based Pricing' },
              { value: 24,  suffix: '/7',        label: 'Support Available'   },
            ].map((stat) => (
              <div key={stat.label} className="p-4">
                <div className="text-3xl md:text-4xl font-black text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES PREVIEW ══════════════════════════════ */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">What We Offer</span>
            <h2 className="heading-lg text-white mt-3 mb-4">Freight Solutions Built for Every Load</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              From temperature-controlled freight to flatbeds, step decks, containers, and intermodal transport — flexible trucking solutions across Canada and the USA.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-6 premium-card group h-full flex flex-col border border-white/5 hover:border-blue-500/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                    <s.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">{s.desc}</p>
                  <div className="flex gap-2 mt-auto">
                    <Link href={`/services/${s.slug}`} className="flex-1 text-center text-sm border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-white py-2 rounded-lg transition-all">
                      View Details
                    </Link>
                    <Link href={`/quote?service=${s.slug}`} className="flex-1 text-center text-sm bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white py-2 rounded-lg transition-all">
                      Get Quote
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Link href="/services" className="btn-shine inline-flex items-center gap-2 border border-blue-500/40 hover:border-blue-500 text-blue-400 hover:text-white font-semibold px-8 py-3 rounded-xl transition-all">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══ CANADA-USA ROUTE ══════════════════════════════ */}
      <section className="py-24 px-4 bg-[#111827]/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <Reveal>
            <span className="text-orange-400 text-sm font-bold uppercase tracking-widest">Our Coverage</span>
            <h2 className="heading-lg text-white mt-3 mb-6">Moving Freight Across Borders with Confidence</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Based in Surrey, British Columbia, we support freight movement between Canada and the United States with reliable communication, flexible service options, and professional transportation support.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: '🇨🇦', text: 'Canada & USA Freight Routes'    },
                { icon: '🤝',  text: 'Business-to-Business Transport' },
                { icon: '📦',  text: 'Flexible Load Solutions'        },
                { icon: '📡',  text: 'Professional Communication'     },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 glass-card p-4 rounded-xl border border-white/5">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-slate-300 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            <Link href="/quote" className="btn-shine inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-6 py-3 rounded-xl transition-all">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative h-72 md:h-96 glass-card rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-orange-900/10" />
              <div className="relative w-full">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-white font-bold text-lg">🇨🇦 Surrey, BC, Canada</span>
                </div>
                <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden mb-2 mx-4">
                  <motion.div className="absolute top-0 h-full bg-gradient-to-r from-blue-500 via-blue-400 to-orange-500 rounded-full"
                    animate={{ x: ['-100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
                    style={{ width: '100%' }} />
                  <motion.div className="absolute top-1/2 -translate-y-1/2 text-base"
                    animate={{ left: ['0%', '95%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}>
                    🚛
                  </motion.div>
                </div>
                <div className="flex justify-between mx-4 mb-6">
                  {[0,1,2,3,4].map((i) => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400/40"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} />
                  ))}
                </div>
                <div className="flex items-center gap-2 justify-end mb-8">
                  <span className="text-white font-bold text-lg">USA 🇺🇸</span>
                  <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[{ label:'Routes',value:'Canada–USA'},{label:'Services',value:'6 Types'},{label:'Base',value:'Surrey, BC'}].map((item) => (
                    <div key={item.label} className="text-center glass p-3 rounded-lg">
                      <p className="text-white text-sm font-bold">{item.value}</p>
                      <p className="text-slate-500 text-xs">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═════════════════════════════════ */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">Why RS Trans Logistics</span>
            <h2 className="heading-lg text-white mt-3">
              Reliable Trucking. Strong Communication.<br />Professional Service.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="glass-card border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 text-center group premium-card h-full">
                  <div className="w-14 h-14 bg-blue-600/15 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/25 transition-colors">
                    <item.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-white font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══════════════════════════════════════ */}
      <section className="py-24 px-4 bg-[#111827]/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-orange-400 text-sm font-bold uppercase tracking-widest">Simple Process</span>
            <h2 className="heading-lg text-white mt-3">How It Works</h2>
          </Reveal>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-blue-500/20 via-blue-500/60 to-blue-500/20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {steps.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="w-16 h-16 glass-card border-2 border-blue-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-400 font-black text-lg">{step.num}</span>
                    </div>
                    <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═════════════════════════════════════ */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-orange-900/10" />
          <div className="absolute inset-0 bg-grid opacity-10" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Reveal>
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-4">Get Started</span>
            <h2 className="heading-lg text-white mb-6">Need Freight Moved Between Canada and the USA?</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Request a custom quote today and let our team help plan the right transportation solution for your shipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="btn-shine flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all neon-blue">
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all hover:bg-white/5">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
        {[0,1,2,3,4,5].map((i) => (
          <motion.div key={i} className="absolute pointer-events-none"
            style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}>
            <Star className="w-3 h-3 text-blue-400" />
          </motion.div>
        ))}
      </section>
    </div>
  );
}
