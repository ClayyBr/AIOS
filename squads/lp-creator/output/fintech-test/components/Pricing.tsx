'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const pricingPlans = [
  {
    name: 'Básico',
    price: 'R$ 99',
    frequency: '/mês',
    features: [
      'Gestão de 1 Empresa',
      'Controle de Receitas e Despesas',
      'Relatórios Básicos',
      'Suporte via Email',
    ],
    isMostPopular: false,
  },
  {
    name: 'Pro',
    price: 'R$ 249',
    frequency: '/mês',
    features: [
      'Gestão de 5 Empresas',
      'Todos os Recursos Básicos',
      'Relatórios Avançados',
      'Automação de Processos',
      'Suporte Prioritário',
    ],
    isMostPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Sob Consulta',
    frequency: '',
    features: [
      'Empresas Ilimitadas',
      'Todos os Recursos Pro',
      'Customização Total',
      'Gerente de Contas Dedicado',
      'Integrações Personalizadas',
    ],
    isMostPopular: false,
  },
];

const Pricing = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 md:py-28 bg-gray-100" id="pricing">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-text-primary text-center mb-16"
        >
          Escolha o Plano Certo Para Sua <span className="text-primary-600">Startup</span>.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white p-8 rounded-2xl shadow-lg border-2 ${plan.isMostPopular ? 'border-primary-600' : 'border-border-light'} flex flex-col justify-between transform hover:scale-[1.02] transition-all duration-300 ease-in-out`}
            >
              {plan.isMostPopular && (
                <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-secondary-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase shadow-md">
                  Popular
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                <p className="text-text-secondary mb-6">{plan.isMostPopular ? 'Ideal para startups em crescimento' : 'Comece com o essencial'}</p>
                <div className="text-5xl font-extrabold text-text-primary mb-2">
                  {plan.price}
                  <span className="text-xl font-medium text-text-secondary">{plan.frequency}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-text-secondary">
                      <Check className="text-secondary-600 mr-3 flex-shrink-0" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="#contact"
                className={`block text-center w-full py-3 rounded-xl font-semibold ${plan.isMostPopular ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md' : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'} transition-colors duration-300 ease-in-out`}
              >
                {plan.isMostPopular ? 'Começar Agora' : 'Escolher Plano'}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;