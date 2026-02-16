'use client';

import { motion } from 'framer-motion';
import { Dumbbell, Zap, Scale, ShieldCheck } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: delay, ease: 'easeOut' }}
      className="bg-primary-800 p-8 rounded-2xl shadow-soft-lg border border-secondary-700 hover:shadow-soft-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
    >
      <div className="text-accent-500 mb-4 text-5xl flex-shrink-0">
        {icon}
      </div>
      <h3 className="font-heading text-3xl font-bold mb-3 text-white">
        {title}
      </h3>
      <p className="text-secondary-300 leading-relaxed font-body">
        {description}
      </p>
    </motion.div>
  );
};

const Features = () => {
  const featuresData = [
    {
      icon: <Dumbbell className="w-16 h-16" />,
      title: 'Treinamento de Força',
      description: 'Programas otimizados para ganho de força e massa muscular, com foco em levantamento de peso olímpico e powerlifting.',
    },
    {
      icon: <Zap className="w-16 h-16" />,
      title: 'Condicionamento Metabólico',
      description: 'Aulas intensas que elevam sua resistência e capacidade cardiovascular, queimando calorias e melhorando seu fôlego.',
    },
    {
      icon: <Scale className="w-16 h-16" />,
      title: 'Equilíbrio e Agilidade',
      description: 'Desenvolva coordenação motora, flexibilidade e mobilidade para superar qualquer desafio físico.',
    },
    {
      icon: <ShieldCheck className="w-16 h-16" />,
      title: 'Comunidade e Suporte',
      description: 'Treine ao lado de atletas dedicados, com o suporte de coaches experientes e uma mentalidade vencedora.',
    },
  ];

  return (
    <section className="py-20 bg-primary-900 rounded-2xl shadow-soft-xl mx-auto container px-6 mt-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-heading text-5xl md:text-6xl font-extrabold text-center mb-16 text-white leading-tight"
      >
        Por Que Escolher a CrossFit Elite?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuresData.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={index * 0.15} // Staggered animation
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
