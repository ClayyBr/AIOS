'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell } from 'lucide-react';

interface NavbarProps {
  onCtaClick: () => void;
}

export default function Navbar({ onCtaClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Coaches', href: '#trainers' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      className={`fixed w-full z-40 transition-all duration-300 ease-in-out
        ${isScrolled ? 'bg-primary-900 bg-opacity-90 shadow-lg backdrop-blur-sm py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center max-w-7xl">
        <Link
          href="/"
          className="text-white text-3xl font-extrabold uppercase font-oswald tracking-wide flex items-center group"
          aria-label="CrossFit Academy Homepage"
        >
          <Dumbbell className="w-8 h-8 mr-2 text-accent-500 group-hover:rotate-12 transition-transform duration-300" />
          Academy
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white hover:text-accent-400 text-lg font-semibold transition-colors duration-200 uppercase font-inter"
              aria-label={link.name}
            >
              {link.name}
            </Link>
          ))}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'var(--color-accent-600)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onCtaClick}
            className="bg-accent-500 text-white font-bold px-6 py-3 rounded-full uppercase shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent-400 focus:ring-offset-2 ml-4"
            aria-label="Join Now"
          >
            Join Now
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-accent-500 rounded p-1"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="fixed top-0 right-0 h-screen w-full bg-primary-900 bg-opacity-95 backdrop-blur-md flex flex-col items-center justify-center p-8 md:hidden z-50"
            aria-labelledby="mobile-menu-title"
          >
            <button
              onClick={toggleMenu}
              className="absolute top-6 right-6 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 rounded p-1"
              aria-label="Close menu"
            >
              <X size={30} />
            </button>
            <h2 id="mobile-menu-title" className="sr-only">
              Mobile Navigation
            </h2>
            <nav className="flex flex-col space-y-8 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-accent-400 text-3xl font-bold uppercase transition-colors duration-200 font-oswald"
                  onClick={toggleMenu}
                  aria-label={link.name}
                >
                  {link.name}
                </Link>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onCtaClick();
                  toggleMenu();
                }}
                className="mt-8 bg-accent-500 text-white font-bold px-8 py-4 rounded-full uppercase text-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent-400 focus:ring-offset-2"
                aria-label="Join Now from mobile menu"
              >
                Join Now
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
