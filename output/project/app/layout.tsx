import './globals.css';
import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import Script from 'next/script';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CrossFit Academy - Maximize Your Potential',
  description: 'Join the premier CrossFit Academy and achieve your fitness goals. High-intensity training, expert coaches, and a supportive community.',
  keywords: ['CrossFit', 'Fitness', 'Workout', 'Gym', 'Training', 'Academy'],
  openGraph: {
    title: 'CrossFit Academy',
    description: 'Maximize Your Potential',
    url: 'https://yourcrossfitacademy.com',
    siteName: 'CrossFit Academy',
    images: [
      {
        url: 'https://yourcrossfitacademy.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CrossFit Academy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CrossFit Academy',
    description: 'Maximize Your Potential',
    images: ['https://yourcrossfitacademy.com/twitter-image.jpg'],
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body>
        {children}
        {/* Google Analytics or other non-essential scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GA_ID');
          `}
        </Script>
      </body>
    </html>
  );
}
