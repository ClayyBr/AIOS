'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { MenuIcon, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Nossos Programas', href: '#programas' },
    { name: 'Treinadores', href: '#treinadores' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.2 }}
      className="sticky top-0 z-50 w-full bg-primary-950/90 backdrop-blur-sm shadow-soft-md rounded-b-2xl"
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-white font-heading text-3xl font-bold tracking-tight hover:text-accent-500 transition-colors duration-200">
          CrossFit <span className="text-accent-500">Elite</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-secondary-200 hover:text-accent-500 text-lg font-medium transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-4 shadow-soft-sm hover:shadow-soft-md">
            <a href="#aula-experimental">Aula Experimental</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:bg-secondary-700">
            {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </div>

        {/* Mobile Nav Overlay */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 120, damping: 17 }}
            className="fixed inset-0 bg-primary-950/95 backdrop-blur-md flex flex-col items-center justify-center lg:hidden z-40"
          >
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="absolute top-6 right-6 text-white hover:bg-secondary-700">
              <X className="w-8 h-8" />
              <span className="sr-only">Close navigation menu</span>
            </Button>
            <nav className="flex flex-col space-y-8 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={toggleMenu}
                  className="text-white text-3xl font-bold hover:text-accent-500 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild size="lg" onClick={toggleMenu} className="mt-8 px-8 py-3 rounded-xl text-xl shadow-soft-md hover:shadow-soft-lg">
                <a href="#aula-experimental">Agende sua Aula</a>
              </Button>
            </nav>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Navbar;
