'use client';

import { motion } from 'framer-motion';
import { useLeadCaptureModal } from '@/hooks/useLeadCaptureModal';

export default function CTASection() {
  const { openModal } = useLeadCaptureModal();

  return (
    <section className="bg-primary-500 py-16 text-center text-white relative overflow-hidden">
      {/* Background circles for visual interest */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary-400 opacity-20 transform -translate-x-1/2 -translate-y-1/2 blur-3xl z-0"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-primary-600 opacity-20 transform translate-x-1/2 translate-y-1/2 blur-3xl z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-oswald font-bold mb-6"
        >
          PRONTO PARA SEU <span className="text-gray-900">DESAFIO</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl max-w-3xl mx-auto mb-10"
        >
          Não espere mais para iniciar a transformação que você deseja. Junte-se à Crosfit Academy e
          libere todo o seu potencial.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 150 }}
          className="btn-secondary btn-lg animation-pulse-on-hover px-12 py-4"
          onClick={openModal}
          aria-label="Junte-se agora à Crosfit Academy"
        >
          JUNTE-SE AGORA
        </motion.button>
      </div>
    </section>
  );
}
