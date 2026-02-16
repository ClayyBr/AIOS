'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonialsData = [
  {
    id: 1,
    name: 'Ana Silva',
    title: 'CEO, TechSolutions',
    quote: 'FintechFlow transformou a forma como gerenciamos nossas finanças. A clareza e a automação nos pouparam horas semanais!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    companyLogo: 'https://www.svgrepo.com/show/303490/google-15.svg', // Placeholder
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    title: 'CFO, InovaLabs',
    quote: 'Relatórios intuitivos e insights preditivos são um divisor de águas. Essencial para qualquer startup que busca crescimento.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
    companyLogo: 'https://www.svgrepo.com/show/303657/microsoft-logo-brand.svg', // Placeholder
  },
  {
    id: 3,
    name: 'Mariana Costa',
    title: 'Fundadora, GrowthBuilders',
    quote: 'A integração com nossos bancos e a automação de despesas é impecável. FintechFlow é uma ferramenta indispensável.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-e69fe1c5a293?auto=format&fit=crop&w=100&q=80',
    companyLogo: 'https://www.svgrepo.com/show/303408/slack-logo.svg', // Placeholder
  },
];

const Testimonials = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 md:py-28 bg-background-light" id="testimonials">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-text-primary text-center mb-16"
        >
          O que nossos <span className="text-secondary-600">Clientes</span> Dizem.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-border-light flex flex-col items-center text-center"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current w-5 h-5" />
                ))}
              </div>
              <p className="text-text-secondary text-lg italic mb-6">"{testimonial.quote}"</p>
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={80}
                height={80}
                className="rounded-full mb-4 object-cover border-2 border-primary-100"
              />
              <h4 className="text-xl font-semibold text-text-primary">{testimonial.name}</h4>
              <p className="text-sm text-text-secondary mb-4">{testimonial.title}</p>
              {testimonial.companyLogo && (
                <Image
                  src={testimonial.companyLogo}
                  alt={`${testimonial.name}'s Company`}
                  width={100}
                  height={30}
                  className="h-7 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;