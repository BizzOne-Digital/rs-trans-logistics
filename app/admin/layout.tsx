'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [newQuotes, setNewQuotes] = useState(0);
  const [newMessages, setNewMessages] = useState(0);

  useEffect(() => {
    if (pathname === '/admin/login') { setChecking(false); return; }

    fetch('/api/admin/me')
      .then((r) => { if (!r.ok) throw new Error('Unauthorized'); return r.json(); })
      .then(() => {
        setChecking(false);
        // Fetch badge counts
        fetch('/api/admin/dashboard')
          .then((r) => r.json())
          .then((d) => {
            setNewQuotes(d.newQuotes || 0);
            setNewMessages(d.newMessages || 0);
          })
          .catch(() => {});
      })
      .catch(() => { router.push('/admin/login'); });
  }, [pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen bg-[#070B12] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B12] flex">
      <AdminSidebar newQuotes={newQuotes} newMessages={newMessages} />
      <main className="flex-1 min-w-0 overflow-auto">{children}</main>
    </div>
  );
}
