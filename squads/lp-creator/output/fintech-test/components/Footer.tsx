import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background-dark text-gray-300 py-12 px-6 md:px-12" id="contact">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-3xl font-bold text-white mb-4 block">
            Fintech<span className="text-primary-400">Flow</span>
          </Link>
          <p className="text-gray-400 text-sm mb-6 max-w-sm">
            Sua solução completa para gestão financeira e empresarial. Impulsione o futuro da sua startup conosco.
          </p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
              <Facebook size={24} />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
              <Twitter size={24} />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
              <Linkedin size={24} />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
              <Instagram size={24} />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Navegação</h3>
          <ul className="space-y-3">
            <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors duration-300">Recursos</Link></li>
            <li><Link href="#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-300">Como Funciona</Link></li>
            <li><Link href="#testimonials" className="text-gray-400 hover:text-white transition-colors duration-300">Depoimentos</Link></li>
            <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors duration-300">Planos</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
          <ul className="space-y-3">
            <li><p className="text-gray-400">Email: contato@fintechflow.com</p></li>
            <li><p className="text-gray-400">Telefone: (XX) XXXX-XXXX</p></li>
            <li><p className="text-gray-400">Endereço: Rua da Inovação, 123 - Cidade - BR</p></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-8 text-center">
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} FintechFlow. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;