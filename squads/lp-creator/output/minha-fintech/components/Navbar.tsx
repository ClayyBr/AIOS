'use client';

import Link from 'next/link';
import { Button } from './ui/Button'; // Assuming a Button component for consistency
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background-main sticky top-0 z-50 shadow-xl-dark/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-montserrat font-bold text-accent-primary">
          FinTech SaaS
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-text-light hover:text-accent-hover transition-colors font-medium">
            Recursos
          </Link>
          <Link href="#how-it-works" className="text-text-light hover:text-accent-hover transition-colors font-medium">
            Como Funciona
          </Link>
          <Link href="#testimonials" className="text-text-light hover:text-accent-hover transition-colors font-medium">
            Depoimentos
          </Link>
          <Link href="#faq" className="text-text-light hover:text-accent-hover transition-colors font-medium">
            FAQ
          </Link>
          <Button asChild className="bg-accent-primary hover:bg-accent-hover text-white rounded-md px-6 py-2 transition-all duration-300">
            <Link href="#cta">Solicitar Demonstração</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-text-light focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background-main pb-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col items-center space-y-4">
            <Link href="#features" onClick={() => setIsOpen(false)} className="text-text-light hover:text-accent-hover transition-colors font-medium text-lg">
              Recursos
            </Link>
            <Link href="#how-it-works" onClick={() => setIsOpen(false)} className="text-text-light hover:text-accent-hover transition-colors font-medium text-lg">
              Como Funciona
            </Link>
            <Link href="#testimonials" onClick={() => setIsOpen(false)} className="text-text-light hover:text-accent-hover transition-colors font-medium text-lg">
              Depoimentos
            </Link>
            <Link href="#faq" onClick={() => setIsOpen(false)} className="text-text-light hover:text-accent-hover transition-colors font-medium text-lg">
              FAQ
            </Link>
            <Button asChild className="bg-accent-primary hover:bg-accent-hover text-white rounded-md px-8 py-3 transition-all duration-300 text-lg">
              <Link href="#cta" onClick={() => setIsOpen(false)}>Solicitar Demonstração</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
