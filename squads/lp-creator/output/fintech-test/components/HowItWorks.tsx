'use client';

import { Link, Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      icon: Link,
      title: '1. Conecte Suas Contas',
      description: 'Conecte facilmente suas contas bancárias e outras plataformas financeiras à FintechFlow de forma segura.',
    },
    {
      icon: Eye,
      title: '2. Visualize Seus Dados',
      description: 'Tenha uma visão clara e consolidada de todas as suas finanças em painéis intuitivos e personalizáveis.',
    },
    {
      icon: Zap,
      title: '3. Tome Decisões Inteligentes',
      description: 'Aproveite insights acionáveis e automação para otimizar suas operações e impulsionar o crescimento.',
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 md:py-28 bg-white" id="how-it-works">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-text-primary text-center mb-16"
        >
          Como Funciona em <span className="text-primary-600">3 Passos Simples</span>.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-md border border-border-light"
            >
              <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mb-6 shadow-md">
                {index + 1}
              </div>
              {<step.icon className="text-secondary-600 mb-4" size={48} />}
              <h3 className="text-2xl font-semibold text-text-primary mb-3">{step.title}</h3>
              <p className="text-text-secondary">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="absolute hidden md:block w-1/2 h-0.5 bg-primary-200 top-1/2 -right-[25%] transform -translate-y-1/2 lg:-right-[50%] opacity-0 md:opacity-100"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;