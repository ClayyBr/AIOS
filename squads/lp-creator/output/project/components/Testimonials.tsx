'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatarSrc: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, avatarSrc }) => (
  <motion.div
    className="bg-primary-800 p-8 rounded-xl border border-border shadow-lg shadow-primary-900/20 flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <Image
      src={avatarSrc}
      alt={`${name}'s avatar`}
      width={80}
      height={80}
      className="rounded-full mb-4 object-cover border-4 border-accent-500"
    />
    <div className="flex text-yellow-400 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-current" />
      ))}
    </div>
    <p className="text-lg text-textPrimary italic mb-4">"{quote}"</p>
    <h4 className="font-semibold text-textPrimary">{name}</h4>
    <p className="text-sm text-textSecondary">{title}</p>
  </motion.div>
);

const Testimonials = () => {
  const testimonialsData = [
    {
      quote: 'A FintechPro revolucionou nossa gestão financeira. Dashboards claros e automação incrível!',
      name: 'Ana Paula',
      title: 'CEO da TechSolutions',
      avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?auto=format&fit=crop&w=128&h=128&q=80',
    },
    {
      quote: 'Nunca foi tão fácil ter controle total do nosso fluxo de caixa. Recomendo a todos os empreendedores.',
      name: 'João Pedro',
      title: 'Fundador da InovaLabs',
      avatarSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&h=128&q=80',
    },
    {
      quote: 'Com os insights da FintechPro, tomamos decisões muito mais estratégicas e escalamos rapidamente.',
      name: 'Mariana Costa',
      title: 'CFO da FutureCorp',
      avatarSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=128&h=128&q=80',
    },
  ];

  return (
    <section id="testimonials" className="bg-primary-900 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold text-textPrimary mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          O que nossos Clientes dizem
        </motion.h2>
        <motion.p
          className="text-xl text-textSecondary mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Histórias de sucesso de startups que transformaram suas finanças com a FintechPro.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
