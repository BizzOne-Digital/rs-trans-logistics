'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Truck, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const services = [
  { name: 'Dry Vans', slug: 'dry-vans' },
  { name: 'Reefer Service', slug: 'reefer-service' },
  { name: 'Flatbed Tarp, Curtain Vans & Roll Tite', slug: 'flatbed-curtain-roll-tite' },
  { name: 'Step Deck', slug: 'step-deck' },
  { name: 'Container Service', slug: 'container-service' },
  { name: 'Intermodal', slug: 'intermodal' },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Request Quote', href: '/quote' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#070B12] border-t border-white/5 overflow-hidden">
      {/* Animated route line background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent w-full"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white font-black text-xl tracking-tight">RS Trans</span>
                <span className="block text-blue-400 text-xs font-medium tracking-widest uppercase -mt-1">Logistics</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Full-service trucking solutions between Canada and the USA. Reliable, professional, and always on time.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="text-blue-400">🇨🇦</span>
              <span>Canada & USA Freight Routes</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="text-orange-400">🚛</span>
              <span>Full-Service Trucking</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-blue-500" />
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm flex items-center gap-2 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 text-blue-500 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-orange-500" />
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-slate-400 hover:text-white text-sm flex items-center gap-2 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-blue-500" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Phone</p>
                  <a href="tel:+12365146876" className="text-sm text-slate-300 hover:text-white transition-colors">
                    +1 236 514 6876
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Email</p>
                  <a href="mailto:rajneelsampat00@gmail.com" className="text-sm text-slate-300 hover:text-white transition-colors break-all">
                    rajneelsampat00@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Address</p>
                  <p className="text-sm text-slate-300">
                    12542 Grove Crescent,<br />Surrey, BC V3V 2L7,<br />Canada
                  </p>
                </div>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/quote"
                className="btn-shine inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 RS Trans Logistics. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
            <span>·</span>
            <span className="text-blue-400">🇨🇦 Canada • USA 🇺🇸</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
