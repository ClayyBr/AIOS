'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const imageSrc = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";

  const fadeInAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative bg-background-light py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInAnimation}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-text-primary leading-tight mb-6">
            Sua Startup <span className="text-primary-600">Cresce</span> Conosco.
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed">
            Simplifique a gestão financeira e acelere a tomada de decisões estratégicas para sua empresa de tecnologia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Experimente Grátis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Saiba Mais
            </Link>
          </div>

          <div className="mt-16 text-text-secondary text-sm md:text-base">
            <p className="mb-4 font-medium">Confiado por mais de 5.000 startups e empresas em crescimento:</p>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start grayscale hover:grayscale-0 transition-all duration-300">
              <Image src="https://www.svgrepo.com/show/303490/google-15.svg" alt="Google Logo" width={90} height={30} className="h-8 w-auto" />
              <Image src="https://www.svgrepo.com/show/303657/microsoft-logo-brand.svg" alt="Microsoft Logo" width={90} height={30} className="h-8 w-auto" />
              <Image src="https://www.svgrepo.com/show/303408/slack-logo.svg" alt="Slack Logo" width={90} height={30} className="h-8 w-auto" />
              <Image src="https://www.svgrepo.com/show/303273/stripe-logo.svg" alt="Stripe Logo" width={90} height={30} className="h-8 w-auto" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInAnimation}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:w-1/2 flex justify-center md:justify-end"
        >
          <Image
            src={imageSrc}
            alt="Dashboard de gestão financeira"
            width={700}
            height={500}
            priority
            className="rounded-2xl shadow-2xl border border-border-light"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;