'use client';

import { motion } from 'framer-motion';
import { Rocket, Shield, Users, Lightbulb } from 'lucide-react';

interface DifferentiatorItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const DifferentiatorItem: React.FC<DifferentiatorItemProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    className="flex flex-col items-center text-center p-6 bg-primary-800 rounded-xl border border-border shadow-lg shadow-primary-900/20"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <Icon className="w-14 h-14 text-accent-500 mb-4" />
    <h3 className="text-2xl font-semibold text-textPrimary mb-2">{title}</h3>
    <p className="text-textSecondary leading-relaxed">{description}</p>
  </motion.div>
);

const Differentiators = () => {
  const differentiatorsData = [
    {
      icon: Shield,
      title: 'Segurança e IA Avançada',
      description: 'Proteção de dados robusta e inteligência artificial para automação e insights preditivos.',
    },
    {
      icon: Rocket,
      title: 'Foco no Crescimento de Startups',
      description: 'Recursos específicos e suporte adaptado para as necessidades dinâmicas de negócios emergentes.',
    },
    {
      icon: Users,
      title: 'Experiência do Usuário Intuitiva',
      description: 'Interface limpa e fácil de usar, permitindo que você se concentre no que realmente importa.',
    },
    {
      icon: Lightbulb,
      title: 'Inovação Constante',
      description: 'Estamos sempre atualizando com as últimas tecnologias e feedback do mercado para oferecer o melhor.',
    },
  ];

  return (
    <section className="bg-primary-900 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold text-textPrimary mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          O que nos torna Diferentes
        </motion.h2>
        <motion.p
          className="text-xl text-textSecondary mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Tecnologia de ponta e uma abordagem centrada no sucesso da sua startup.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentiatorsData.map((item, index) => (
            <DifferentiatorItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
