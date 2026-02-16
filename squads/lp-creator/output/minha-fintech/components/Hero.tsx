'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from './ui/Button';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="hero" className="relative bg-gradient-to-br from-background-main to-[#0C0C14] pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Content Block */}
        <motion.div
          className="text-center lg:text-left lg:w-1/2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-extrabold leading-tight text-text-light mb-4">
            Revolucione sua Gestão <span className="text-accent-primary">Financeira</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-muted mb-8 max-w-xl mx-auto lg:mx-0">
            Simplifique suas finanças, automatize processos e tome decisões estratégicas com nossa plataforma SaaS intuitiva, feita para startups.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild className="bg-accent-primary hover:bg-accent-hover text-white font-semibold rounded-lg px-8 py-4 text-lg shadow-subtle transition-all duration-300 transform hover:-translate-y-1">
              <Link href="#cta">Solicitar Demonstração Grátis</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Image Mockup Block */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.8, ease: 'easeOut' } }}
        >
          <Image
            src="https://images.unsplash.com/photo-1547285117-909774640989?auto=format&fit=crop&w=800&q=80"
            alt="Interface do SaaS de gestão financeira com gráficos e dados"
            width={800}
            height={600}
            quality={80}
            priority
            className="rounded-2xl shadow-xl-dark border border-surface-card"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
