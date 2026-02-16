'use client';

import { motion } from 'framer-motion';
import { Zap, ShieldCheck, PieChart, Banknote } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: FeatureCardProps) => {
  return (
    <motion.div
      className="bg-surface-card p-8 rounded-xl shadow-xl-dark border border-surface-card hover:border-accent-primary transition-all duration-300 group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: delay, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-center w-16 h-16 bg-accent-primary/20 rounded-full mb-6 group-hover:bg-accent-primary transition-colors duration-300">
        <Icon size={32} className="text-accent-primary group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-2xl font-montserrat font-semibold text-text-light mb-3">
        {title}
      </h3>
      <p className="text-text-muted">
        {description}
      </p>
    </motion.div>
  );
};

const Features = () => {
  const featuresData = [
    {
      icon: Zap,
      title: 'Fluxo de Caixa Inteligente',
      description: 'Previsões precisas e insights automatizados para você controlar cada centavo com maestria.'
    },
    {
      icon: PieChart,
      title: 'Relatórios Personalizados',
      description: 'Crie dashboards e relatórios customizados que respondem às suas perguntas de negócio mais importantes.'
    },
    {
      icon: Banknote,
      title: 'Integrações Bancárias Seguras',
      description: 'Conecte suas contas bancárias de forma segura e sincronize transações em tempo real.'
    },
    {
      icon: ShieldCheck,
      title: 'Segurança de Dados Avançada',
      description: 'Seus dados financeiros protegidos com criptografia de ponta e conformidade com as melhores práticas de segurança.'
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-[#0F0F16]">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-montserrat font-bold text-text-light mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Recursos Pensados para o Seu Crescimento
        </motion.h2>
        <motion.p
          className="text-xl text-text-muted mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ferramentas poderosas para transformar a gestão financeira da sua startup.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
