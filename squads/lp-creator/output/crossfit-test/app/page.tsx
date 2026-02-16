import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';
import Testimonials from '@/components/Testimonials';
import Trainers from '@/components/Trainers';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Trainers />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
