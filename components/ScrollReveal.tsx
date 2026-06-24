'use client';

import { useEffect, useRef, ReactNode, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children, delay = 0, direction = 'up', className = '', once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(ref, { once, margin: '-50px' });
  const controls = useAnimation();

  // Only animate after mount to avoid SSR mismatch
  useEffect(() => { setMounted(true); }, []);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  useEffect(() => {
    if (!mounted) return;
    if (isInView) controls.start('visible');
    else if (!once) controls.start('hidden');
  }, [isInView, controls, once, mounted]);

  if (!mounted) {
    // On server / before mount: render children without animation
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
