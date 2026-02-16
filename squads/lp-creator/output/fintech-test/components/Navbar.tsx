'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="bg-white shadow-md sticky top-0 z-50 py-4 px-6 md:px-12"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-text-primary">
          Fintech<span className="text-primary-600">Flow</span>
        </Link>
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="#features" className="text-text-secondary hover:text-primary-600 transition-colors duration-300">
            Recursos
          </Link>
          <Link href="#how-it-works" className="text-text-secondary hover:text-primary-600 transition-colors duration-300">
            Como Funciona
          </Link>
          <Link href="#testimonials" className="text-text-secondary hover:text-primary-600 transition-colors duration-300">
            Depoimentos
          </Link>
          <Link href="#pricing" className="text-text-secondary hover:text-primary-600 transition-colors duration-300">
            Planos
          </Link>
          <Link
            href="#contact"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary-700 transition-all duration-300 ease-in-out"
          >
            Contato
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-text-primary focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white mt-4 border-t border-border-light py-4"
        >
          <div className="flex flex-col items-center space-y-4">
            <Link onClick={toggleMenu} href="#features" className="text-text-secondary hover:text-primary-600 transition-colors duration-300">
              Recursos
            </Link>
            <Link onClick={toggleMenu} href="#how-it-works" className="text-text-secondary hover:text-primary-600 transition-colors duration-300">
              Como Funciona
            </Link>
            <Link onClick={toggleMenu} href="#testimonials" className="text-text-secondary hover:text-primary-600 transition-colors duration-300">
              Depoimentos
            </Link>
            <Link onClick={toggleMenu} href="#pricing" className="text-text-secondary hover:text-primary-600 transition-colors duration-300">
              Planos
            </Link>
            <Link
              onClick={toggleMenu}
              href="#contact"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary-700 transition-all duration-300 ease-in-out w-fit"
            >
              Contato
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;