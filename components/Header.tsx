'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ChevronDown, X, Menu, Phone } from 'lucide-react';

const services = [
  { name: 'Dry Vans', slug: 'dry-vans' },
  { name: 'Reefer Service', slug: 'reefer-service' },
  { name: 'Flatbed Tarp, Curtain Vans & Roll Tite', slug: 'flatbed-curtain-roll-tite' },
  { name: 'Step Deck', slug: 'step-deck' },
  { name: 'Container Service', slug: 'container-service' },
  { name: 'Intermodal', slug: 'intermodal' },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services', hasDropdown: true },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // On non-home pages always show solid header; on home only solid after scroll
  const solidBg = !isHome || scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solidBg
            ? 'bg-[#070B12]/95 backdrop-blur-xl border-b border-white/8 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors neon-blue">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white font-black text-xl tracking-tight leading-none">RS Trans</span>
                <span className="block text-blue-400 text-xs font-medium tracking-widest uppercase">Logistics</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.hasDropdown ? (
                    <div
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          pathname === link.href || pathname.startsWith('/services')
                            ? 'text-blue-400 bg-blue-500/10'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                      </Link>

                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-2 w-72 bg-[#0d1420] rounded-xl shadow-2xl border border-white/10 py-2 z-50"
                          >
                            {services.map((s) => (
                              <Link
                                key={s.slug}
                                href={`/services/${s.slug}`}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-blue-500/10 transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                {s.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        pathname === link.href
                          ? 'text-blue-400 bg-blue-500/10'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: phone + CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+12365146876"
                className="hidden lg:flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                +1 236 514 6876
              </a>
              <Link
                href="/quote"
                className="hidden md:inline-flex btn-shine items-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 neon-blue"
              >
                Request a Quote
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Full Screen */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#070B12] flex flex-col"
          >
            {/* Mobile header bar */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-black text-lg">RS Trans Logistics</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      className={`block text-xl font-bold py-4 border-b border-white/5 transition-colors ${
                        pathname === link.href ? 'text-blue-400' : 'text-white hover:text-blue-400'
                      }`}
                    >
                      {link.name}
                    </Link>
                    {link.hasDropdown && (
                      <div className="ml-4 mt-2 mb-4 flex flex-col gap-2">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="text-slate-400 hover:text-white text-base py-1 transition-colors flex items-center gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-blue-500" />
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="px-6 pb-8 flex flex-col gap-3 border-t border-white/5 pt-6"
            >
              <a
                href="tel:+12365146876"
                className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl text-white font-medium hover:border-blue-500/40 transition-colors"
              >
                <Phone className="w-5 h-5 text-blue-400" />
                +1 236 514 6876
              </a>
              <Link
                href="/quote"
                className="btn-shine bg-blue-600 hover:bg-blue-500 text-white text-center font-bold py-4 rounded-xl text-lg transition-colors"
              >
                Request a Quote
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
