'use client';

import Image from 'next/image';
import { Wallet, FileText, Settings, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const featureData = [
    {
      icon: Wallet,
      title: 'Gestão Financeira Simplificada',
      description: 'Automatize o controle de receitas e despesas, tenha visibilidade total do seu fluxo de caixa em tempo real.',
      imageUrl: 'https://images.unsplash.com/photo-1551288259-f83138b6d769?auto=format&fit=crop&w=800&q=80', // Dashboard financeira
    },
    {
      icon: FileText,
      title: 'Relatórios Inteligentes e Personalizados',
      description: 'Crie relatórios detalhados com poucos cliques e obtenha insights acionáveis para otimizar suas estratégias.',
      imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80', // Relatórios
    },
    {
      icon: Settings,
      title: 'Automação de Processos Financeiros',
      description: 'Reduza a carga manual com automação de faturas, conciliação bancária e pagamentos recorrentes.',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80', // Automação
    },
    {
      icon: Zap,
      title: 'Conexão com Bancos e APIs',
      description: 'Integre-se facilmente com seus bancos e outras ferramentas essenciais, consolidando dados em um só lugar.',
      imageUrl: 'https://images.unsplash.com/photo-1517292275990-25298818c35b?auto=format&fit=crop&w=800&q=80', // Conexões API
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50" id="features">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-text-primary text-center mb-16"
        >
          Recursos que Impulsionam seu <span className="text-secondary-600">Crescimento</span>.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {featureData.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-border-light overflow-hidden flex flex-col lg:flex-row"
            >
              <div className="lg:w-1/2 p-8 flex flex-col justify-center items-start">
                {<feature.icon className="text-primary-600 mb-4" size={48} />}
                <h3 className="text-2xl font-semibold text-text-primary mb-3">{feature.title}</h3>
                <p className="text-text-secondary mb-4">{feature.description}</p>
              </div>
              <div className="lg:w-1/2 relative min-h-[200px] lg:min-h-auto">
                <Image
                  src={feature.imageUrl}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;