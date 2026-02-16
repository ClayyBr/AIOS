import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-950 text-secondary-300 py-12 rounded-t-2xl shadow-inner-soft-lg mt-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="col-span-full md:col-span-1">
          <Link href="/" className="text-white font-heading text-3xl font-bold tracking-tight hover:text-accent-500 transition-colors duration-200 mb-4 block">
            CrossFit <span className="text-accent-500">Elite</span>
          </Link>
          <p className="text-sm leading-relaxed mb-4">
            Treinamento funcional de alta intensidade para atletas que buscam o extraordinário.
            Desafie seus limites e conquiste a elite com a gente.
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-secondary-400 hover:text-accent-500 transition-colors duration-200">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="text-secondary-400 hover:text-accent-500 transition-colors duration-200">
              <Instagram size={24} />
            </a>
            <a href="#" aria-label="YouTube" className="text-secondary-400 hover:text-accent-500 transition-colors duration-200">
              <Youtube size={24} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-xl font-semibold mb-4 text-white">Links Rápidos</h3>
          <ul className="space-y-2">
            <li><Link href="#programas" className="hover:text-white transition-colors duration-200">Nossos Programas</Link></li>
            <li><Link href="#treinadores" className="hover:text-white transition-colors duration-200">Nossos Treinadores</Link></li>
            <li><Link href="#depoimentos" className="hover:text-white transition-colors duration-200">Depoimentos</Link></li>
            <li><Link href="#aula-experimental" className="hover:text-white transition-colors duration-200">Aula Experimental</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-xl font-semibold mb-4 text-white">Contato</h3>
          <p className="mb-2">Rua da Força, 123 - Centro, Cidade - UF</p>
          <p className="mb-2">Telefone: (XX) XXXX-XXXX</p>
          <p className="mb-2">Email: contato@crossfitelite.com.br</p>
          <p>Horário: Seg-Sex: 6h-22h, Sáb: 8h-14h</p>
        </div>

        <div className="lg:col-span-1">
          <h3 className="font-heading text-xl font-semibold mb-4 text-white">Newsletter</h3>
          <p className="text-sm mb-4">Receba as últimas novidades e dicas de treino em seu e-mail.</p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="p-3 rounded-lg bg-primary-800 border border-secondary-600 text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-accent-500 shadow-soft-sm"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="bg-accent-500 text-white font-bold py-3 px-6 rounded-lg shadow-soft-md hover:bg-accent-600 transition-colors duration-200 hover:shadow-soft-lg"
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-secondary-700 mt-12 pt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} CrossFit Elite. Todos os direitos reservados.</p>
        <p className="mt-2">Desenvolvido com paixão por atletas para atletas.</p>
      </div>
    </footer>
  );
};

export default Footer;
