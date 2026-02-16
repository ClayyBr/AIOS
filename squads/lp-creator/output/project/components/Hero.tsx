'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.3 } },
};

const logoVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delay: 0.6 } },
};

const logoItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section className="relative bg-primary-900 py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 text-center md:text-left">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-textPrimary leading-tight mb-4"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            Descomplique a Gestão Financeira da sua <span className="text-accent-500">Startup</span>
          </motion.h1>
          <motion.p
            className="text-xl text-textSecondary mb-8 max-w-lg mx-auto md:mx-0"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...textVariants.visible.transition, delay: 0.2 }}
          >
            FintechPro: A plataforma completa para otimizar suas finanças, automatizar processos e impulsionar o crescimento.
          </motion.p>
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...textVariants.visible.transition, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-8"
          >
            <button className="px-8 py-3 bg-accent-500 text-white font-semibold rounded-xl text-lg hover:bg-violet-600 transition-colors duration-300 shadow-xl shadow-accent-900/30">
              Experimente Grátis
            </button>
            <button className="px-8 py-3 border border-border text-textSecondary font-semibold rounded-xl text-lg hover:bg-primary-800 hover:text-white transition-colors duration-300">
              Solicitar Demonstração
            </button>
          </motion.div>

          <motion.div
            className="mt-8"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-textSecondary text-sm uppercase mb-4 tracking-wider">Confiança de grandes startups:</h3>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-6">
              {['Google', 'Netflix', 'Amazon', 'Spotify'].map((company, idx) => (
                <motion.div key={idx} variants={logoItem}>
                  <span className="text-2xl font-semibold text-textSecondary grayscale hover:grayscale-0 transition-all duration-300">
                    {company}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-full max-w-2xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-accent-900/20 border border-primary-700">
            <Image
              src="https://images.unsplash.com/photo-1542744095-fcf48d80b0ae?auto=format&fit=crop&w=1200&q=80"
              alt="FintechPro Dashboard Mockup"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
