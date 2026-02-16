'use client';

import { motion } from 'framer-motion';
import { Rocket, Settings, Wallet, CheckCircle } from 'lucide-react';

interface StepCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  stepNumber: number;
}

const StepCard = ({ icon: Icon, title, description, stepNumber }: StepCardProps) => {
  return (
    <motion.div
      className="relative flex flex-col items-center text-center p-6 rounded-xl bg-surface-card shadow-xl-dark border border-surface-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: stepNumber * 0.15 }}
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-accent-primary rounded-full flex items-center justify-center text-white text-xl font-bold border-4 border-background-main z-10">
        {stepNumber}
      </div>
      <div className="mt-8 mb-4 w-16 h-16 flex items-center justify-center bg-accent-primary/20 rounded-full">
        <Icon size={32} className="text-accent-primary" />
      </div>
      <h3 className="text-2xl font-montserrat font-semibold text-text-light mb-2">
        {title}
      </h3>
      <p className="text-text-muted">
        {description}
      </p>
    </motion.div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: Rocket,
      title: 'Crie sua Conta',
      description: 'Rápido e fácil. Em poucos minutos, sua plataforma estará pronta para uso.'
    },
    {
      icon: Settings,
      title: 'Configure suas Integrações',
      description: 'Conecte suas contas bancárias e outras ferramentas financeiras sem burocracia.'
    },
    {
      icon: Wallet,
      title: 'Monitore e Analise',
      description: 'Visualize seus dados em tempo real e gere relatórios detalhados com inteligência.'
    },
    {
      icon: CheckCircle,
      title: 'Tome Decisões Inteligentes',
      description: 'Use insights acionáveis para otimizar suas finanças e impulsionar o crescimento.'
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background-main">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-montserrat font-bold text-text-light mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Comece a Otimizar Suas Finanças em Poucos Passos
        </motion.h2>
        <motion.p
          className="text-xl text-text-muted mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Nosso processo é desenhado para ser simples, rápido e eficiente.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
              stepNumber={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
