'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-surface-card rounded-xl shadow-xl-dark border border-surface-card overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-montserrat font-semibold text-text-light pr-4">
          {question}
        </h3>
        <ChevronDown
          className={`text-accent-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={24}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="px-6 pb-6"
          >
            <p className="text-text-muted leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: 'O FinTech SaaS é seguro para meus dados financeiros?',
      answer: 'Sim, levamos a segurança dos seus dados muito a sério. Utilizamos criptografia de ponta, autenticação multifator e estamos em conformidade com os mais rigorosos padrões de segurança da indústria para garantir a proteção de todas as suas informações.'
    },
    {
      question: 'Quais tipos de integrações bancárias são suportadas?',
      answer: 'Nossa plataforma se integra com os principais bancos do mercado via APIs seguras, permitindo a sincronização automática de transações e saldos. Oferecemos suporte para bancos nacionais e internacionais populares.'
    },
    {
      question: 'Posso personalizar os relatórios e dashboards?',
      answer: 'Absolutamente! Você tem total liberdade para criar e personalizar relatórios, dashboards e visualizações de dados para atender às necessidades específicas da sua startup, com diversas opções de filtros e métricas.'
    },
    {
      question: 'Existe um período de teste gratuito?',
      answer: 'Sim, oferecemos um período de teste gratuito de 14 dias para você experimentar todas as funcionalidades da plataforma sem compromisso. Nenhuma informação de cartão de crédito é exigida para iniciar o teste.'
    },
    {
      question: 'Como funciona o suporte ao cliente?',
      answer: 'Nossa equipe de suporte está disponível 24/7 via chat online, e-mail e telefone para ajudar com qualquer dúvida ou problema que você possa ter. Também temos uma vasta base de conhecimento e tutoriais para autoatendimento.'
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-background-main">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-montserrat font-bold text-text-light mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Perguntas Frequentes
        </motion.h2>
        <motion.p
          className="text-xl text-text-muted mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Encontre respostas para as dúvidas mais comuns sobre nosso FinTech SaaS.
        </motion.p>

        <div className="space-y-6 max-w-3xl mx-auto text-left">
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
