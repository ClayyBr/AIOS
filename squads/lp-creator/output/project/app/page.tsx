import Hero from '@/components/Hero';
import ProblemSolution from '@/components/ProblemSolution';
import KeyFeatures from '@/components/KeyFeatures';
import Differentiators from '@/components/Differentiators';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <ProblemSolution />
      <KeyFeatures />
      <Differentiators />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
