'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Truck, LayoutDashboard, Settings, FileText, MessageSquare, Quote,
  Star, HelpCircle, Image, Globe, User, ChevronLeft, ChevronRight,
  LogOut, Menu, X, Layers
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: FileText, label: 'Website Content', href: '/admin/content' },
  { icon: Layers, label: 'Services', href: '/admin/services' },
  { icon: Quote, label: 'Quote Requests', href: '/admin/quotes', badge: 'quotes' },
  { icon: MessageSquare, label: 'Contact Messages', href: '/admin/messages', badge: 'messages' },
  { icon: Star, label: 'Testimonials', href: '/admin/testimonials' },
  { icon: HelpCircle, label: 'FAQs', href: '/admin/faqs' },
  { icon: Image, label: 'Media', href: '/admin/media' },
  { icon: Settings, label: 'Company Settings', href: '/admin/settings' },
  { icon: Globe, label: 'SEO Settings', href: '/admin/seo' },
  { icon: User, label: 'My Profile', href: '/admin/profile' },
];

interface AdminSidebarProps {
  newQuotes?: number;
  newMessages?: number;
}

export default function AdminSidebar({ newQuotes = 0, newMessages = 0 }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  const getBadgeCount = (badge: string) => {
    if (badge === 'quotes') return newQuotes;
    if (badge === 'messages') return newMessages;
    return 0;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 p-4 border-b border-white/5 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Truck className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-white font-bold text-sm leading-tight">RS Trans</p>
            <p className="text-blue-400 text-xs tracking-wider">Admin Panel</p>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          className={`ml-auto text-slate-500 hover:text-white transition-colors hidden lg:block ${collapsed ? 'ml-0 mt-1' : ''}`}>
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          const badgeCount = item.badge ? getBadgeCount(item.badge) : 0;
          return (
            <Link key={item.href} href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`admin-sidebar-item flex items-center gap-3 px-4 py-3 text-sm transition-all group ${
                active ? 'active text-blue-400' : 'text-slate-400 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'}`} />
              {!collapsed && (
                <>
                  <span className="font-medium">{item.label}</span>
                  {badgeCount > 0 && (
                    <span className="ml-auto bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-5 text-center">
                      {badgeCount}
                    </span>
                  )}
                </>
              )}
              {collapsed && badgeCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <button onClick={handleLogout}
          className={`flex items-center gap-3 text-slate-400 hover:text-red-400 text-sm transition-colors w-full px-1 py-2 ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Logout' : undefined}>
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
        {!collapsed && (
          <Link href="/" target="_blank"
            className="flex items-center gap-3 text-slate-500 hover:text-blue-400 text-xs transition-colors mt-2 px-1 py-1">
            <Globe className="w-4 h-4 flex-shrink-0" />
            View Website
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass-card border border-white/10 rounded-lg text-slate-300"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-[#0d1420] border-r border-white/5 z-50 lg:hidden">
              <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:flex flex-col h-screen bg-[#0d1420] border-r border-white/5 flex-shrink-0 overflow-hidden sticky top-0"
      >
        <SidebarContent />
      </motion.aside>
    </>
  );
}
