'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from './ui/Button';

const CallToAction = () => {
  return (
    <section id="cta" className="py-16 md:py-24 bg-gradient-to-r from-accent-primary to-accent-hover relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')] bg-repeat bg-center"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl font-montserrat font-bold text-white mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Pronto para Revolucionar Sua Gestão Financeira?
        </motion.h2>
        <motion.p
          className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Experimente nossa plataforma e descubra como a eficiência e inteligência podem impulsionar sua startup.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button asChild className="bg-white text-accent-primary hover:bg-gray-100 font-semibold rounded-lg px-10 py-5 text-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <Link href="#">Cadastre-se Agora!</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
