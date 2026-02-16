'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, DollarSign, PieChart, Shield, Zap, TrendingUp, Users, Lightbulb } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    className="bg-primary-800 p-8 rounded-xl border border-border shadow-lg shadow-primary-900/20 text-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <Icon className="w-12 h-12 text-accent-500 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-textPrimary mb-2">{title}</h3>
    <p className="text-textSecondary">{description}</p>
  </motion.div>
);

const KeyFeatures = () => {
  const features = [
    {
      icon: Wallet,
      title: 'Controle de Fluxo de Caixa',
      description: 'Gerencie todas as entradas e saídas, mantenha sua saúde financeira em dia com dashboards intuitivos.',
    },
    {
      icon: DollarSign,
      title: 'Faturamento & Despesas',
      description: 'Automatize o faturamento e categorize despesas com facilidade, eliminando erros manuais.',
    },
    {
      icon: PieChart,
      title: 'Relatórios e Insights',
      description: 'Obtenha análises profundas com relatórios personalizáveis e insights acionáveis para decisões estratégicas.',
    },
    {
      icon: Zap,
      title: 'Automação Inteligente',
      description: 'Conecte-se com seus bancos e automatize conciliações e pagamentos repetitivos, economizando tempo.',
    },
    {
      icon: Shield,
      title: 'Segurança de Dados',
      description: 'Seus dados financeiros protegidos com criptografia de ponta e conformidade com as melhores práticas de segurança.',
    },
    {
      icon: TrendingUp,
      title: 'Escalabilidade para Startups',
      description: 'Nossa plataforma cresce junto com você, adaptando-se às necessidades de startups em rápida expansão.',
    },
  ];

  return (
    <section id="features" className="bg-primary-900 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold text-textPrimary mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Funcionalidades que Impulsionam seu Negócio
        </motion.h2>
        <motion.p
          className="text-xl text-textSecondary mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Tudo o que sua startup precisa para uma gestão financeira eficiente e focada no crescimento.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
