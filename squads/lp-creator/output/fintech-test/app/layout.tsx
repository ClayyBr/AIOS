import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Fintech SaaS: Gestão Empresarial para Startups',
  description: 'Simplifique sua gestão financeira e impulsione o crescimento da sua startup com nossa plataforma SaaS de ponta.'
};

export default function RootLayout({
  children
}: { 
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-background-light text-text-primary antialiased font-sans">
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-between">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}