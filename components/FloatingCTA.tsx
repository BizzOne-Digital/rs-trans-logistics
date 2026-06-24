'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquarePlus } from 'lucide-react';

export default function FloatingCTA() {
  return (
    <motion.div
      className="floating-cta"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
    >
      <Link
        href="/quote"
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-4 py-3 rounded-full shadow-2xl transition-all duration-200 group"
        title="Request a Quote"
      >
        <MessageSquarePlus className="w-5 h-5" />
        <span className="hidden sm:block text-sm">Get a Quote</span>
      </Link>
    </motion.div>
  );
}
