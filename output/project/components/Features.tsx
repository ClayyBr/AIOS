'use client';

import { motion } from 'framer-motion';
import { Dumbbell, ShieldCheck, Users, Trophy } from 'lucide-react';

const features = [
  {
    icon: Dumbbell,
    title: 'Expert Coaching',
    description:
      'Learn from certified L2/L3 coaches dedicated to your progress and safety. Personalized guidance for every level.',
  },
  {
    icon: ShieldCheck,
    title: 'Proven Methodology',
    description:
      'Our CrossFit programs are designed for maximum effectiveness, combining strength, endurance, and agility.',
  },
  {
    icon: Users,
    title: 'Supportive Community',
    description:
      'Train alongside motivated individuals in an inclusive environment that fosters camaraderie and mutual growth.',
  },
  {
    icon: Trophy,
    title: 'Achieve Your Goals',
    description:
      'Whether it’s weight loss, muscle gain, or competitive fitness, we provide the path to reach your full potential.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl md:text-5xl font-extrabold text-primary-900 mb-12 font-oswald uppercase"
        >
          Why Choose Our Academy?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-[1.03] transition-transform duration-300 ease-in-out"
            >
              <feature.icon className="w-16 h-16 text-primary-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-primary-800 mb-4 font-oswald uppercase">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
