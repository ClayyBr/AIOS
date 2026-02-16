import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface-card py-12 md:py-16 border-t border-surface-card shadow-xl-dark/10">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <Link href="/" className="text-3xl font-montserrat font-bold text-accent-primary mb-4 block">
              FinTech SaaS
            </Link>
            <p className="text-text-muted leading-relaxed max-w-sm mx-auto md:mx-0">
              Plataforma líder em gestão financeira inteligente para acelerar o crescimento da sua startup.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-montserrat font-semibold text-text-light mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-text-muted hover:text-accent-hover transition-colors">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-text-muted hover:text-accent-hover transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-text-muted hover:text-accent-hover transition-colors">
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-text-muted hover:text-accent-hover transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xl font-montserrat font-semibold text-text-light mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-text-muted hover:text-accent-hover transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-muted hover:text-accent-hover transition-colors">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-muted hover:text-accent-hover transition-colors">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-montserrat font-semibold text-text-light mb-4">Contato</h3>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <a href="#" aria-label="Facebook" className="text-text-muted hover:text-accent-hover transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="text-text-muted hover:text-accent-hover transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-text-muted hover:text-accent-hover transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-text-muted hover:text-accent-hover transition-colors">
                <Instagram size={24} />
              </a>
            </div>
            <div className="flex items-center justify-center md:justify-start text-text-muted">
              <Mail size={20} className="mr-2" />
              <a href="mailto:contato@fintechsaas.com" className="hover:text-accent-hover transition-colors">contato@fintechsaas.com</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-card/50 text-center">
          <p className="text-text-muted text-sm">&copy; {new Date().getFullYear()} FinTech SaaS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
