'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
  delay: number;
}

const TestimonialCard = ({ quote, name, title, avatarUrl, delay }: TestimonialProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: delay, ease: 'easeOut' }}
      className="bg-primary-800 p-8 rounded-2xl shadow-soft-lg border border-secondary-700 flex flex-col hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300"
    >
      <p className="text-secondary-200 text-lg italic mb-6 leading-relaxed font-body">
        "{quote}"
      </p>
      <div className="flex items-center mt-auto">
        <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-accent-500 shadow-soft-sm">
          <Image
            src={avatarUrl}
            alt={`Avatar de ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-white text-lg">{name}</p>
          <p className="text-sm text-accent-400">{title}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const testimonialsData = [
    {
      quote: 'Desde que entrei na CrossFit Elite, minha força e confiança dispararam. A comunidade é incrível e os coaches são de outro nível!',
      name: 'Fernanda Oliveira',
      title: 'Atleta CrossFit',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80',
    },
    {
      quote: 'Eu estava procurando um desafio e encontrei! O treino é intenso, mas o resultado é visível em poucas semanas. Recomendo a todos!',
      name: 'Gustavo Santos',
      title: 'Empreendedor',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-e6955a6d102f?auto=format&fit=crop&w=80&h=80&q=80',
    },
    {
      quote: 'Nunca imaginei que poderia levantar tanto peso ou ter tanta energia. A Elite me transformou, não só fisicamente, mas mentalmente.',
      name: 'Patrícia Rocha',
      title: 'Designer Gráfica',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?auto=format&fit=crop&w=80&h=80&q=80',
    },
  ];

  return (
    <section id="depoimentos" className="py-20 bg-primary-900 mx-auto container px-6 mt-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-heading text-5xl md:text-6xl font-extrabold text-center mb-16 text-white leading-tight"
      >
        O Que Nossos <span className="text-accent-500">Atletas Dizem</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.name}
            quote={testimonial.quote}
            name={testimonial.name}
            title={testimonial.title}
            avatarUrl={testimonial.avatarUrl}
            delay={index * 0.15}
          />
        ))}
      </div>

      {/* Halo Effect for logos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
        className="mt-20 text-center"
      >
        <h3 className="font-heading text-3xl font-bold mb-8 text-white">Parceiros e Certificações</h3>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-20">
          {[
            'https://source.unsplash.com/featured/?crossfit-logo,brand',
            'https://source.unsplash.com/featured/?fitness-logo,brand',
            'https://source.unsplash.com/featured/?sport-logo,brand',
            'https://source.unsplash.com/featured/?nutrition-logo,brand',
          ].map((logo, index) => (
            <motion.div
              key={index}
              className="relative w-32 h-20 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 cursor-pointer"
              whileHover={{ scale: 1.05, filter: 'grayscale(0%)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
            >
              <Image
                src={logo}
                alt={`Logo do Parceiro ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
