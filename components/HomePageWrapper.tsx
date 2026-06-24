'use client';

import dynamic from 'next/dynamic';

// ssr:false completely prevents server rendering of HomePageClient.
// This eliminates ALL Framer Motion hydration mismatches.
const HomePageClient = dynamic(() => import('./HomePageClient'), {
  ssr: false,
  loading: () => (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#070B12] flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 text-sm tracking-widest uppercase">Loading...</p>
      </div>
    </div>
  ),
});

export default function HomePageWrapper() {
  return <HomePageClient />;
}
