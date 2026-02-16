'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  imageSrc: string;
}

const TestimonialCard = ({ quote, name, title, company, imageSrc }: TestimonialCardProps) => {
  return (
    <motion.div
      className="bg-surface-card p-8 rounded-xl shadow-xl-dark border border-surface-card flex flex-col text-center items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mb-4 flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} fill="#FFD700" stroke="#FFD700" className="mx-0.5" />
        ))}
      </div>
      <p className="text-text-light text-lg italic mb-6">\"{quote}\"</p>
      <Image
        src={imageSrc}
        alt={name}
        width={80}
        height={80}
        className="rounded-full mb-4 object-cover border-2 border-accent-primary"
      />
      <h4 className="text-xl font-montserrat font-semibold text-text-light mb-1">
        {name}
      </h4>
      <p className="text-text-muted text-sm">
        {title}, <span className="font-bold text-accent-primary">{company}</span>
      </p>
    </motion.div>
  );
};

const Testimonials = () => {
  const testimonialsData = [
    {
      quote: 'A plataforma FinTech SaaS transformou a forma como gerenciamos nossas finanças. A automação e os insights são incríveis!',
      name: 'João Silva',
      title: 'CEO & Co-fundador',
      company: 'Innovatech Solutions',
      imageSrc: 'https://images.unsplash.com/photo-1535713875002-d1d0cfdfeeab?auto=format&fit=crop&w=80&q=80'
    },
    {
      quote: 'Nunca foi tão fácil ter uma visão completa do nosso fluxo de caixa. Essencial para qualquer startup em crescimento.',
      name: 'Maria Oliveira',
      title: 'CFO',
      company: 'GrowthHub Labs',
      imageSrc: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80'
    },
    {
      quote: 'Reduzimos em 30% o tempo gasto com contabilidade graças aos relatórios personalizados. Altamente recomendado!',
      name: 'Carlos Mendes',
      title: 'Diretor Financeiro',
      company: 'Future Ventures',
      imageSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80'
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#0F0F16]">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-montserrat font-bold text-text-light mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          O Que Nossos Clientes Dizem
        </motion.h2>
        <motion.p
          className="text-xl text-text-muted mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Histórias de sucesso de startups que transformaram sua gestão financeira conosco.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
