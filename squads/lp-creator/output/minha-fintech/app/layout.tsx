import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'Fintech SaaS: Gestão Empresarial Inteligente para Startups',
  description: 'Revolucione sua gestão financeira com nossa plataforma SaaS intuitiva. Fluxo de caixa, relatórios e automação para o sucesso de sua startup.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable} dark`}>
      <body className="bg-background-main font-inter text-text-light antialiased">
        <Navbar />
        <main className="flex flex-col min-h-[calc(100vh-theme(spacing.24))] sm:min-h-[calc(100vh-theme(spacing.28))] md:min-h-[calc(100vh-theme(spacing.36))] lg:min-h-[calc(100vh-theme(spacing.48))]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
