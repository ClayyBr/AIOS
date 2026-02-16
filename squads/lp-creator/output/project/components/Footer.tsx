import Link from 'next/link';
import { Rocket, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-800 py-12 border-t border-border mt-16">
      <div className="container mx-auto px-4 text-textSecondary text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <Rocket className="w-7 h-7 text-accent-500" />
              <span className="text-2xl font-bold text-textPrimary">FintechPro</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              Sua solução completa para gestão financeira e operacional, projetada para o sucesso da sua startup.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-textPrimary mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">Funcionalidades</Link></li>
              <li><Link href="#testimonials" className="hover:text-white transition-colors">Depoimentos</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-textPrimary mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Termos de Serviço</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Segurança</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} FintechPro. Todos os direitos reservados.</p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Twitter" className="text-textSecondary hover:text-white transition-colors">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-textSecondary hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link href="#" aria-label="GitHub" className="text-textSecondary hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
