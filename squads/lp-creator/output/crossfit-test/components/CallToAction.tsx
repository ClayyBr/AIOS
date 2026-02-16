'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import Image from 'next/image';

const CallToAction = () => {
  return (
    <section id="aula-experimental" className="relative py-20 bg-primary-950 text-white rounded-2xl mx-auto container px-6 mt-16 overflow-hidden shadow-soft-xl">
      <Image
        src="https://images.unsplash.com/photo-1579758774026-64667a4a613d?auto=format&fit=crop&w=1920&q=80"
        alt="Mulher em pose de ginástica artística durante treino intenso"
        fill
        sizes="100vw"
        className="object-cover brightness-30 contrast-125"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-transparent to-primary-950"></div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-heading text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-accent-500 drop-shadow-lg [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)]"
        >
          Pronto para o Desafio?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl mb-10 max-w-3xl font-body text-secondary-200 leading-relaxed"
        >
          Sua primeira aula experimental é a porta de entrada para uma comunidade que vai transformar seu corpo e sua mente. Venha sentir a diferença de um treino de elite.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        >
          <Button
            asChild
            size="lg"
            className="font-bold text-xl px-10 py-5 rounded-xl shadow-soft-xl transition-all duration-300 hover:shadow-soft-2xl hover:scale-105 animate-pulse-framer"
            // Framer Motion pulse animation
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <a href="#contact-form">Reserve Sua Aula Gratuita!</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
