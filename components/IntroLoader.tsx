'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    try {
      const shown = sessionStorage.getItem('intro-shown');
      if (shown) return;
    } catch {
      return;
    }
    setShow(true);
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => {
        try { sessionStorage.setItem('intro-shown', 'true'); } catch { /* ignore */ }
        setShow(false);
      }, 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro-loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-grid opacity-30" />

          {/* Animated bottom road line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={phase >= 2 ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Route label */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-blue-400"
            >
              <span>🇨🇦 Canada</span>
              <motion.div
                className="h-px w-16 bg-gradient-to-r from-blue-500 to-orange-500"
                initial={{ scaleX: 0 }}
                animate={phase >= 2 ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8 }}
              />
              <span>USA 🇺🇸</span>
            </motion.div>

            {/* Logo / Company name */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center"
            >
              {/* Logo using favicon.png */}
              {!logoError ? (
                <img
                  src="/favicon.png"
                  alt="Blue River Logistics"
                  className="h-20 md:h-24 w-auto mx-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                /* Text fallback shown when logo file isn't placed yet */
                <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                  <motion.span
                    className="text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    Blue
                  </motion.span>{' '}
                  <motion.span
                    className="gradient-text"
                    initial={{ opacity: 0, x: 20 }}
                    animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    River
                  </motion.span>
                </h1>
              )}

              <motion.p
                className="text-xl md:text-2xl font-light tracking-[0.35em] text-slate-300 mt-3 uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                Logistics
              </motion.p>
            </motion.div>

            {/* Truck icon */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={phase >= 2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, type: 'spring' }}
              className="text-4xl"
            >
              🚛
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-48 h-0.5 bg-gray-800 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-orange-500"
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-slate-500 text-sm tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Moving Freight Across Borders
            </motion.p>
          </div>

          {/* Light streaks */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              style={{ width: `${100 + i * 50}px`, top: `${30 + i * 20}%`, left: '-200px' }}
              animate={{ x: ['0px', '120vw'], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.3, repeat: Infinity, repeatDelay: 2 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
