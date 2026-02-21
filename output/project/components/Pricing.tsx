'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useLeadCaptureModal } from '@/hooks/useLeadCaptureModal';

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const plansWithoutTrainer: Plan[] = [
  {
    name: 'Essencial',
    price: 'R$ 99/mês',
    description: 'Acesso total à academia e aulas em grupo.',
    features: [
      'Acesso ilimitado à academia',
      'Aulas em grupo (Crosfit, LPO, Ginástica)',
      'Comunidade ativa',
      'Plano de treino básico',
    ],
  },
  {
    name: 'Performance',
    price: 'R$ 149/mês',
    description: 'Tudo do Essencial + Avaliação física trimestral.',
    features: [
      'Acesso ilimitado à academia',
      'Aulas em grupo (Crosfit, LPO, Ginástica)',
      'Comunidade ativa',
      'Plano de treino avançado',
      'Avaliação física trimestral',
      'Desconto em workshops',
    ],
    isPopular: true,
  },
  {
    name: 'Flex',
    price: 'R$ 79/mês',
    description: 'Acesso em horários específicos, ideal para quem tem agenda flexível.',
    features: ['Acesso em horários selecionados', 'Aulas em grupo (Crosfit)', 'Comunidade básica'],
  },
];

const plansWithTrainer: Plan[] = [
  {
    name: 'Personal',
    price: 'R$ 299/mês',
    description: 'Plano Essencial + 4 sessões/mês com Personal Trainer.',
    features: [
      'Todos os benefícios do plano Essencial',
      '4 sessões personalizadas com treinador',
      'Plano de nutrição inicial',
      'Acompanhamento individualizado',
    ],
  },
  {
    name: 'Elite',
    price: 'R$ 499/mês',
    description: 'Plano Performance + 8 sessões/mês com Personal Trainer e suporte 24/7.',
    features: [
      'Todos os benefícios do plano Performance',
      '8 sessões personalizadas com treinador',
      'Plano de nutrição completo',
      'Suporte via WhatsApp 24/7',
      'Acesso VIP a eventos',
    ],
    isPopular: true,
  },
  {
    name: 'Empresarial',
    price: 'Sob Consulta',
    description: 'Soluções personalizadas para empresas e grupos, com foco em team building.',
    features: [
      'Treino em grupo (equipes)',
      'Workshops de bem-estar corporativo',
      'Programas de team building',
      'Flexibilidade de horários e local',
    ],
  },
];

export default function Pricing() {
  const [withTrainer, setWithTrainer] = useState(false);
  const { openModal } = useLeadCaptureModal();

  const currentPlans = withTrainer ? plansWithTrainer : plansWithoutTrainer;

  return (
    <section id="pricing" className="py-20 bg-gray-950 text-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-oswald font-bold text-white mb-4 sm:text-5xl">
          Nossos <span className="text-primary-500">Planos</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
          Encontre o plano perfeito para você, seja qual for seu objetivo. Temos opções com e sem
          acompanhamento personalizado.
        </p>

        {/* Toggle */}
        <div className="inline-flex p-1 bg-primary-900 rounded-full mb-12 shadow-inner">
          <motion.button
            onClick={() => setWithTrainer(false)}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${!withTrainer ? 'bg-primary-500 text-white shadow-md' : 'text-gray-300 hover:text-primary-300'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-pressed={!withTrainer}
          >
            Sem Treinador
          </motion.button>
          <motion.button
            onClick={() => setWithTrainer(true)}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${withTrainer ? 'bg-primary-500 text-white shadow-md' : 'text-gray-300 hover:text-primary-300'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-pressed={withTrainer}
          >
            Com Treinador
          </motion.button>
        </div>

        {/* Pricing Grid */}
        <motion.div
          key={withTrainer ? 'with-trainer' : 'without-trainer'} // Key change for re-animation
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`bg-primary-900 p-8 rounded-xl shadow-xl border-2 ${plan.isPopular ? 'border-primary-500' : 'border-transparent'} flex flex-col justify-between transform hover:scale-[1.02] transition-transform duration-300`}
              whileHover={{ y: -5 }} // subtle lift on hover
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg animate-pulse-fade">
                  Popular!
                </div>
              )}
              <div>
                <h3 className="text-3xl font-oswald font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6 min-h-[48px]">{plan.description}</p>
                <p className="text-5xl font-oswald font-extrabold text-primary-500 mb-6">
                  {plan.price}
                </p>
                <ul className="text-gray-200 text-left space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircleIcon className="h-6 w-6 text-primary-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <motion.button
                onClick={openModal}
                className={`btn-primary w-full ${plan.isPopular ? 'btn-lg' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Assinar plano ${plan.name}`}
              >
                Começar
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
