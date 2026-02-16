'use client';

import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section id="contact" className="bg-primary-800 py-16 md:py-24 rounded-2xl mx-4 md:mx-auto max-w-4xl border border-border shadow-xl shadow-accent-900/10 my-16">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold text-textPrimary mb-6 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Pronto para Transformar a Gestão da sua Startup?
        </motion.h2>
        <motion.p
          className="text-xl text-textSecondary mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Experimente a FintechPro hoje e descubra o poder de uma gestão financeira inteligente e automatizada.
        </motion.p>
        <motion.button
          className="px-10 py-4 bg-accent-500 text-white font-semibold rounded-xl text-xl hover:bg-violet-600 transition-colors duration-300 shadow-xl shadow-accent-900/40"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Começar Agora, é Grátis!
        </motion.button>
      </div>
    </section>
  );
};

export default CallToAction;
