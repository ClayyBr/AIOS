'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail } from 'lucide-react';

interface TrainerProps {
  name: string;
  specialty: string;
  imageUrl: string;
  bio: string;
  socials: {
    facebook?: string;
    instagram?: string;
    email?: string;
  };
  delay: number;
}

const TrainerCard = ({ name, specialty, imageUrl, bio, socials, delay }: TrainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: delay, ease: 'easeOut' }}
      className="bg-primary-800 p-6 rounded-2xl shadow-soft-lg border border-secondary-700 hover:shadow-soft-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
    >
      <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-accent-500 shadow-soft-md">
        <Image
          src={imageUrl}
          alt={`Foto de ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <h3 className="font-heading text-3xl font-bold mb-2 text-white">{name}</h3>
      <p className="text-accent-400 text-lg mb-4 uppercase font-semibold tracking-wide">{specialty}</p>
      <p className="text-secondary-300 leading-relaxed font-body mb-6 text-sm max-w-sm">
        {bio}
      </p>
      <div className="flex space-x-4">
        {socials.facebook && (
          <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${name} no Facebook`} className="text-secondary-400 hover:text-accent-500 transition-colors duration-200">
            <Facebook size={24} />
          </a>
        )}
        {socials.instagram && (
          <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${name} no Instagram`} className="text-secondary-400 hover:text-accent-500 transition-colors duration-200">
            <Instagram size={24} />
          </a>
        )}
        {socials.email && (
          <a href={`mailto:${socials.email}`} aria-label={`Enviar e-mail para ${name}`} className="text-secondary-400 hover:text-accent-500 transition-colors duration-200">
            <Mail size={24} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Trainers = () => {
  const trainersData = [
    {
      name: 'Laura Martins',
      specialty: 'Head Coach & Levantamento Olímpico',
      imageUrl: 'https://images.unsplash.com/photo-1549476465-b15c92c813f2?auto=format&fit=crop&w=400&q=80',
      bio: 'Com mais de 10 anos de experiência em CrossFit, Laura é especialista em levantamento olímpico e guia atletas para novos recordes pessoais.',
      socials: { instagram: 'https://instagram.com/lauramartins' },
    },
    {
      name: 'Roberto Silva',
      specialty: 'Especialista em Força e Condicionamento',
      imageUrl: 'https://images.unsplash.com/photo-1594833203998-3f5f3e9e1f5a?auto=format&fit=crop&w=400&q=80',
      bio: 'Ex-atleta profissional, Roberto foca em técnicas avançadas de powerlifting e construção de resistência para alta performance.',
      socials: { facebook: 'https://facebook.com/robertosilva', email: 'roberto@crossfitelite.com.br' },
    },
    {
      name: 'Mariana Costa',
      specialty: 'Mobilidade e Ginástica',
      imageUrl: 'https://images.unsplash.com/photo-1582046808761-45607b22a611?auto=format&fit=crop&w=400&q=80',
      bio: 'Mariana traz sua experiência em ginástica para aprimorar a mobilidade, flexibilidade e movimentos corporais complexos de nossos alunos.',
      socials: { instagram: 'https://instagram.com/marianacosta' },
    },
  ];

  return (
    <section id="treinadores" className="py-20 bg-primary-950 mx-auto container px-6 mt-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-heading text-5xl md:text-6xl font-extrabold text-center mb-16 text-white leading-tight"
      >
        Conheça Nossos <span className="text-accent-500">Coaches Elite</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {trainersData.map((trainer, index) => (
          <TrainerCard
            key={trainer.name}
            name={trainer.name}
            specialty={trainer.specialty}
            imageUrl={trainer.imageUrl}
            bio={trainer.bio}
            socials={trainer.socials}
            delay={index * 0.15}
          />
        ))}
      </div>
    </section>
  );
};

export default Trainers;
