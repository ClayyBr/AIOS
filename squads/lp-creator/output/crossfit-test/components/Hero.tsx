'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from './ui/Button'; // Assuming a generic Button component

const Hero = () => {
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary-950 text-white rounded-b-2xl shadow-soft-xl">
      <Image
        src="https://images.unsplash.com/photo-1594916896229-23f03b50c182?auto=format&fit=crop&w=1920&q=80"
        alt="Atleta fazendo deadlift pesado em uma academia CrossFit de elite com iluminação dramática"
        fill
        priority
        className="object-cover brightness-50 contrast-125"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-primary-950/40"></div>

      <div className="relative z-10 container mx-auto px-6 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="lg:w-3/5"
          >
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6 text-accent-500 uppercase drop-shadow-lg [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)]">
              Desafie Seus Limites.
              <br />
              Conquiste a Elite.
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed font-body max-w-2xl mx-auto lg:mx-0 text-secondary-200">
              Experimente o treinamento funcional mais intenso e a comunidade mais motivadora. Sua jornada para a força começa aqui.
            </p>
            <motion.div variants={buttonVariants}>
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-4 rounded-xl shadow-soft-md transition-all duration-300 hover:shadow-soft-lg hover:scale-105"
              >
                <a href="#aula-experimental">Agende Sua Aula Experimental</a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="lg:w-2/5 flex justify-center lg:justify-end"
          >
            {/* Example of a form or another CTA, mimicking Z-pattern */}
            <div className="bg-primary-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-soft-xl border border-secondary-700 w-full max-w-sm">
              <h3 className="font-heading text-3xl font-bold mb-4 text-center text-accent-400">Comece Agora!</h3>
              <p className="text-sm text-secondary-300 mb-6 text-center">Preencha e entraremos em contato para sua aula grátis.</p>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">Nome</label>
                  <input type="text" id="name" placeholder="Seu Nome Completo" className="w-full p-3 bg-primary-700 border border-secondary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-white placeholder-secondary-400 shadow-soft-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input type="email" id="email" placeholder="Seu Melhor E-mail" className="w-full p-3 bg-primary-700 border border-secondary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-white placeholder-secondary-400 shadow-soft-sm" />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Telefone</label>
                  <input type="tel" id="phone" placeholder="WhatsApp (Opcional)" className="w-full p-3 bg-primary-700 border border-secondary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-white placeholder-secondary-400 shadow-soft-sm" />
                </div>
                <Button type="submit" className="w-full font-bold text-lg py-3 rounded-lg shadow-soft-md hover:shadow-soft-lg transition-all duration-300 hover:scale-105">
                  Solicitar Aula Grátis
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
