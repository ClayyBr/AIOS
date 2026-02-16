import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils'; // Utility for combining tailwind classes

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CrossFit Elite - Treinamento Funcional de Alta Intensidade',
  description: 'Alcance seu potencial máximo com treinamento funcional de alta intensidade. Junte-se à nossa comunidade CrossFit de elite e transforme seu corpo e mente.',
  keywords: ['crossfit', 'treinamento funcional', 'alta intensidade', 'fitness', 'academia', 'elite', 'saúde', 'bem-estar'],
  openGraph: {
    title: 'CrossFit Elite - Treinamento Funcional de Alta Intensidade',
    description: 'Alcance seu potencial máximo com treinamento funcional de alta intensidade. Junte-se à nossa comunidade CrossFit de elite e transforme seu corpo e mente.',
    url: 'https://www.crossfitelite.com.br',
    siteName: 'CrossFit Elite',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1571024376174-889410313133?auto=format&fit=crop&w=1200&q=80', // Example OG image
        width: 1200,
        height: 630,
        alt: 'Atleta levantando peso na academia CrossFit Elite',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CrossFit Elite - Treinamento Funcional de Alta Intensidade',
    description: 'Alcance seu potencial máximo com treinamento funcional de alta intensidade. Junte-se à nossa comunidade CrossFit de elite e transforme seu corpo e mente.',
    images: ['https://images.unsplash.com/photo-1571024376174-889410313133?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn(inter.variable, oswald.variable)}>
      <body className="bg-primary-950 text-white font-body antialiased">
        {children}
      </body>
    </html>
  );
}
