'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden bg-gray-900">
      <Image
        src="/images/hero-crossfit.jpg"
        alt="CrossFit athletes working out in a gym"
        fill
        priority // Optimize LCP
        sizes="100vw"
        className="object-cover opacity-40 md:opacity-50 lg:opacity-60"
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl text-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase mb-6 drop-shadow-lg leading-tight font-oswald text-white"
        >
          Unleash Your Inner Athlete
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto drop-shadow-md font-inter"
        >
          Join the premier CrossFit Academy and redefine your limits with expert coaching,
          cutting-edge facilities, and a thriving community.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'var(--color-accent-600)' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          className="bg-accent-500 text-white text-xl md:text-2xl font-bold px-10 py-5 rounded-full uppercase shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent-400 focus:ring-offset-2"
          onClick={onCtaClick}
          aria-label="Join Now and Start Your Fitness Journey"
        >
          Join Now
        </motion.button>
      </div>
    </section>
  );
}
