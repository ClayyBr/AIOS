import Hero from '@/components/Hero';
import ProblemSolution from '@/components/ProblemSolution';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
    </>
  );
}