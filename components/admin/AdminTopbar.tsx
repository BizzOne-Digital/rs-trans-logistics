'use client';

import { useEffect, useState } from 'react';
import { Bell, User } from 'lucide-react';

interface AdminInfo {
  name: string;
  email: string;
  role: string;
}

export default function AdminTopbar({ title }: { title: string }) {
  const [admin, setAdmin] = useState<AdminInfo | null>(null);

  useEffect(() => {
    fetch('/api/admin/me')
      .then((r) => r.json())
      .then((data) => { if (data.admin) setAdmin(data.admin); })
      .catch(() => {});
  }, []);

  return (
    <header className="h-16 bg-[#0d1420] border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="text-white font-bold text-lg">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-lg">
          <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-white text-sm font-medium leading-none">{admin?.name || 'Admin'}</p>
            <p className="text-slate-500 text-xs">{admin?.role || 'admin'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
