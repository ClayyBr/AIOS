'use client';

import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const ProblemSolution = () => {
  return (
    <section className="bg-primary-900 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-textPrimary text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Resolvendo os Desafios da sua Startup
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Problemas */}
          <motion.div
            className="bg-primary-800 p-8 rounded-xl border border-border shadow-lg shadow-primary-900/20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            <h3 className="text-3xl font-semibold text-textPrimary mb-6 flex items-center justify-center md:justify-start">
              <XCircle className="w-8 h-8 text-error mr-3" /> Dores Comuns
            </h3>
            <ul className="space-y-4">
              <motion.li variants={itemVariants} className="flex items-start text-lg">
                <XCircle className="w-6 h-6 text-error flex-shrink-0 mr-3 mt-1" />
                <span>Controle financeiro manual e propenso a erros.</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start text-lg">
                <XCircle className="w-6 h-6 text-error flex-shrink-0 mr-3 mt-1" />
                <span>Dificuldade em visualizar o fluxo de caixa em tempo real.</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start text-lg">
                <XCircle className="w-6 h-6 text-error flex-shrink-0 mr-3 mt-1" />
                <span>Perda de tempo com conciliação bancária e faturamento.</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start text-lg">
                <XCircle className="w-6 h-6 text-error flex-shrink-0 mr-3 mt-1" />
                <span>Falta de insights para tomadas de decisão estratégicas.</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Soluções */}
          <motion.div
            className="bg-primary-800 p-8 rounded-xl border border-border shadow-lg shadow-primary-900/20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            <h3 className="text-3xl font-semibold text-textPrimary mb-6 flex items-center justify-center md:justify-start">
              <CheckCircle className="w-8 h-8 text-success mr-3" /> Nossa Solução
            </h3>
            <ul className="space-y-4">
              <motion.li variants={itemVariants} className="flex items-start text-lg">
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mr-3 mt-1" />
                <span>Automação completa para fluxo de caixa e contabilidade.</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start text-lg">
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mr-3 mt-1" />
                <span>Dashboards em tempo real com visão 360º de suas finanças.</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start text-lg">
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mr-3 mt-1" />
                <span>Otimização de tempo com conciliação e faturamento automatizados.</span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start text-lg">
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mr-3 mt-1" />
                <span>Relatórios inteligentes e recomendações para decisões assertivas.</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
