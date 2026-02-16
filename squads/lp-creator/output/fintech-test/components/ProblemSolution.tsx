'use client';

import { AlertTriangle, CreditCard, BarChart2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProblemSolution = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 md:py-28 bg-white" id="problem-solution">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-text-primary text-center mb-16"
        >
          Os desafios que sua startup enfrenta.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-md border border-border-light"
          >
            <AlertTriangle className="text-red-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-text-primary mb-3">Dificuldade na Previsão Financeira</h3>
            <p className="text-text-secondary">Estimar o fluxo de caixa futuro e as necessidades de capital é um labirinto sem ferramentas adequadas.</p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-md border border-border-light"
          >
            <CreditCard className="text-orange-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-text-primary mb-3">Controle de Gastos Ineficiente</h3>
            <p className="text-text-secondary">Despesas descentralizadas e falta de visibilidade levam a gastos excessivos e não planejados.</p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-md border border-border-light"
          >
            <BarChart2 className="text-blue-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-text-primary mb-3">Falta de Insights Acionáveis</h3>
            <p className="text-text-secondary">Dados financeiros brutos não se transformam em decisões estratégicas sem análise profunda.</p>
          </motion.div>
        </div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-text-primary text-center mb-16"
        >
          Como <span className="text-primary-600">FintechFlow</span> Resolve.
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:w-1/2"
          >
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              Nossa plataforma centraliza e automatiza a gestão financeira da sua startup, transformando complexidade em clareza.
              Com <span className="font-medium text-text-primary">FintechFlow</span>, você obtém uma visão 360º das suas finanças, desde o controle de despesas até a projeção de cenários futuros.
            </p>
            <ul className="space-y-4 text-text-secondary">
              <li className="flex items-start">
                <CheckCircle className="text-secondary-500 mr-2 flex-shrink-0 mt-1" size={20} />
                Análises preditivas para decisões estratégicas.
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-secondary-500 mr-2 flex-shrink-0 mt-1" size={20} />
                Gestão inteligente de despesas com categorização automática.
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-secondary-500 mr-2 flex-shrink-0 mt-1" size={20} />
                Relatórios personalizáveis e painéis intuitivos.
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-xl shadow-xl flex items-center justify-center text-primary-800 text-lg font-semibold">
              Solução Visual aqui
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;