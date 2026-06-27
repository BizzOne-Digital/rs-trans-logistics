'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight, Search } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

// Default FAQs shown even if database is empty
const DEFAULT_FAQS = [
  {
    _id: '1',
    category: 'General',
    question: 'What areas do you service?',
    answer: 'Blue River Logistics provides full-service trucking between Canada and the United States. We are based in Surrey, British Columbia, and operate freight routes across both countries.',
  },
  {
    _id: '2',
    category: 'General',
    question: 'How do I get a freight quote?',
    answer: 'Simply fill out our Request a Quote form with your pickup location, delivery location, freight type, and shipment details. Our team will review your request and get back to you with a custom quote promptly.',
  },
  {
    _id: '3',
    category: 'Services',
    question: 'What types of freight do you transport?',
    answer: 'We handle a wide range of freight including general cargo (dry vans), temperature-sensitive goods (reefer), oversized loads (flatbed, step deck), shipping containers, and intermodal freight.',
  },
  {
    _id: '4',
    category: 'Services',
    question: 'Do you offer temperature-controlled transportation?',
    answer: 'Yes. Our Reefer Service provides temperature-controlled transportation for food products, refrigerated goods, pharmaceuticals, and any freight requiring climate consistency throughout the journey.',
  },
  {
    _id: '5',
    category: 'Pricing',
    question: 'How is pricing determined?',
    answer: 'All our pricing is quote-based. Factors that affect pricing include pickup and delivery locations, freight type, weight and dimensions, preferred dates, and service type. There are no hidden fees — we provide transparent custom quotes.',
  },
  {
    _id: '6',
    category: 'Pricing',
    question: 'Is there a minimum shipment size?',
    answer: 'We handle shipments of various sizes. Contact us with your specific requirements and we will provide a tailored solution that fits your freight needs.',
  },
  {
    _id: '7',
    category: 'Cross-Border',
    question: 'Do you handle cross-border customs?',
    answer: 'Blue River Logistics specializes in Canada-USA freight routes. While we are a transportation carrier, we can guide you on documentation requirements. We recommend working with a licensed customs broker for customs clearance.',
  },
  {
    _id: '8',
    category: 'Cross-Border',
    question: 'How long does cross-border shipping take?',
    answer: 'Transit times vary depending on the route, freight type, and border crossing. We will provide estimated transit times with your custom quote. Our team ensures proper documentation to minimize border delays.',
  },
  {
    _id: '9',
    category: 'Booking',
    question: 'How far in advance should I book?',
    answer: 'We recommend booking as early as possible to ensure availability, especially for time-sensitive shipments. Contact us with your preferred pickup date and we will do our best to accommodate your schedule.',
  },
  {
    _id: '10',
    category: 'Booking',
    question: 'How do I track my shipment?',
    answer: 'Once your shipment is booked, our team maintains communication throughout the transit process. Contact us directly at +1 236 514 6876 or rajneelsampat00@gmail.com for shipment updates.',
  },
  {
    _id: '11',
    category: 'Services',
    question: 'What is the difference between Step Deck and Flatbed?',
    answer: 'A Step Deck trailer has a lower deck height, allowing it to carry taller loads that exceed standard height limits for regular flatbeds. Flatbed trailers are ideal for general oversized loads, while step decks are suited for equipment and machinery with height restrictions.',
  },
  {
    _id: '12',
    category: 'General',
    question: 'How do I contact Blue River Logistics?',
    answer: 'You can reach us by phone at +1 236 514 6876, by email at rajneelsampat00@gmail.com, or by filling out the contact form on our website. Our team is ready to assist with your freight needs.',
  },
];

const CATEGORIES = ['All', 'General', 'Services', 'Pricing', 'Cross-Border', 'Booking'];

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  isActive?: boolean;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(DEFAULT_FAQS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    // Try to load from database; fall back to defaults silently
    fetch('/api/faqs')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data.filter((f: FAQ) => f.isActive !== false));
        }
      })
      .catch(() => {/* use defaults */});
  }, []);

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === 'All' || f.category === activeCategory;
    const matchSearch = f.question.toLowerCase().includes(search.toLowerCase()) ||
                        f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Group by category for display
  const grouped = filtered.reduce<Record<string, FAQ[]>>((acc, faq) => {
    const cat = faq.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {});

  return (
    <div className="bg-[#070B12] min-h-screen">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-36 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-400 border border-blue-500/30 rounded-full px-4 py-2 mb-6 glass"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="heading-xl text-white mb-5"
          >
            Got <span className="gradient-text">Questions?</span>
            <br />We Have Answers.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto mb-10"
          >
            Everything you need to know about our trucking and freight services between Canada and the USA.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input w-full pl-12 pr-4 py-4 rounded-2xl text-base"
            />
          </motion.div>
        </div>
      </section>

      {/* ── FILTER TABS ───────────────────────────────────── */}
      <section className="px-4 pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'glass border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ─────────────────────────────────── */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto">

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <HelpCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No questions found matching your search.</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="mt-4 text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : activeCategory === 'All' ? (
            // Show grouped by category when "All" is selected
            Object.entries(grouped).map(([cat, items], gi) => (
              <ScrollReveal key={cat} delay={gi * 0.05}>
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-blue-400" />
                    </span>
                    <h2 className="text-white font-bold text-lg">{cat}</h2>
                    <span className="text-xs text-slate-500 glass px-2 py-0.5 rounded-full border border-white/5">
                      {items.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {items.map((faq) => (
                      <FAQItem
                        key={faq._id}
                        faq={faq}
                        isOpen={openId === faq._id}
                        onToggle={() => setOpenId(openId === faq._id ? null : faq._id)}
                      />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))
          ) : (
            // Flat list for single category
            <div className="space-y-3">
              {filtered.map((faq, i) => (
                <ScrollReveal key={faq._id} delay={i * 0.04}>
                  <FAQItem
                    faq={faq}
                    isOpen={openId === faq._id}
                    onToggle={() => setOpenId(openId === faq._id ? null : faq._id)}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── STILL HAVE QUESTIONS CTA ──────────────────────── */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="glass-card border border-blue-500/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-orange-900/10 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <HelpCircle className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="heading-md text-white mb-4">Still Have Questions?</h2>
                <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                  Can&apos;t find the answer you&apos;re looking for? Our team is ready to help with any questions about your freight needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="btn-shine flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all neon-blue"
                  >
                    Contact Us <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/quote"
                    className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:bg-white/5"
                  >
                    Request a Quote
                  </Link>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400">
                  <a href="tel:+12365146876" className="flex items-center gap-2 hover:text-white transition-colors">
                    📞 +1 236 514 6876
                  </a>
                  <a href="mailto:rajneelsampat00@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                    ✉️ rajneelsampat00@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

// ── FAQ Accordion Item ─────────────────────────────────
function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={`glass-card rounded-xl border transition-all duration-200 overflow-hidden ${
        isOpen ? 'border-blue-500/30' : 'border-white/5 hover:border-white/10'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={`font-semibold text-base leading-snug transition-colors ${isOpen ? 'text-blue-400' : 'text-white'}`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-blue-400' : 'text-slate-500'}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 border-t border-white/5">
              <p className="text-slate-400 leading-relaxed pt-4">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
