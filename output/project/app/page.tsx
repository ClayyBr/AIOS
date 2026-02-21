'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Placeholder data for sections (normally would come from a CMS or API)
const trainers = [
  {
    id: 1,
    name: 'Coach Alex R.',
    role: 'Head Coach - L3 Certified',
    image: '/images/trainer-alex.jpg',
    description:
      'Specializes in Olympic Weightlifting and Gymnastics. Passionate about helping athletes reach their full potential.',
  },
  {
    id: 2,
    name: 'Coach Sarah K.',
    role: 'Coach - L2 Certified',
    image: '/images/trainer-sarah.jpg',
    description:
      'Focuses on endurance and mobility. Believes in functional fitness for all ages and abilities.',
  },
  {
    id: 3,
    name: 'Coach Mike J.',
    role: 'Coach - L2 Certified',
    image: '/images/trainer-mike.jpg',
    description:
      'Expert in powerlifting and strength conditioning. Motivates members to push their limits safely.',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Emily R.',
    quote:
      'Joining CrossFit Academy changed my life! I’ve never been stronger or healthier. The coaches are incredible!',
    image: '/images/testimonial-emily.jpg',
  },
  {
    id: 2,
    name: 'David S.',
    quote:
      'The community here is amazing. Everyone is supportive, and the workouts are challenging but rewarding.',
    image: '/images/testimonial-david.jpg',
  },
  {
    id: 3,
    name: 'Maria T.',
    quote:
      'I finally found a place that pushes me every day. Lost 20 pounds and gained so much confidence!',
    image: '/images/testimonial-maria.jpg',
  },
];

const pricingPlans = [
  {
    id: 1,
    name: 'Starter',
    price: 99,
    frequency: 'month',
    features: ['Access to all classes', 'Beginner-friendly workouts', 'Community events'],
    cta: 'Join Now',
  },
  {
    id: 2,
    name: 'Pro',
    price: 149,
    frequency: 'month',
    features: [
      'All Starter features',
      'Personalized programming',
      'Nutrition guidance',
      'Open gym access',
    ],
    cta: 'Join Now',
    highlight: true,
  },
  {
    id: 3,
    name: 'Elite',
    price: 199,
    frequency: 'month',
    features: [
      'All Pro features',
      '1-on-1 coaching sessions',
      'Exclusive workshops',
      'Priority booking',
    ],
    cta: 'Join Now',
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formShake, setFormShake] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling underneath
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = ''; // Restore scrolling
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen, closeModal]);

  // Trap focus within the modal
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            // If Shift + Tab, focus goes to the last element
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              event.preventDefault();
            }
          } else {
            // If Tab, focus goes to the first element
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              event.preventDefault();
            }
          }
        }
      };

      modalRef.current.focus(); // Focus the modal container itself
      document.addEventListener('keydown', handleTabKey);

      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isModalOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');

      // Simple validation example
      if (!name || !email) {
        setFormShake(true);
        setTimeout(() => setFormShake(false), 500); // Stop shaking after 0.5s
        return;
      }

      // Simulate API call
      console.log('Form Submitted:', { name, email });
      alert('Thank you for your interest! We will contact you shortly.');
      closeModal();
      form.reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-inter text-gray-900 bg-gray-50">
      <Navbar onCtaClick={openModal} />

      <main className="flex-grow">
        <Hero onCtaClick={openModal} />
        {/* About Us Section */}
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-center text-4xl md:text-5xl font-extrabold text-primary-900 mb-12 font-oswald uppercase"
            >
              About Our Academy
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  CrossFit Academy is more than just a gym; it's a community dedicated to
                  transforming lives through fitness. Our expertly designed programs combine
                  weightlifting, gymnastics, and metabolic conditioning to deliver unparalleled
                  results.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We believe in functional fitness that prepares you for life's challenges. Our
                  certified coaches provide personalized attention, ensuring proper form and
                  maximizing your potential in every workout. Join us and discover a stronger,
                  healthier you.
                </p>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                  <li>State-of-the-art equipment</li>
                  <li>Diverse class schedule</li>
                  <li>Supportive and motivating environment</li>
                  <li>Experienced and certified coaches</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative w-full aspect-video rounded-lg shadow-xl overflow-hidden"
              >
                {/* Placeholder for embedded video. Ensure aspect-ratio for CLS. */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/your_crossfit_video_id?modestbranding=1&autohide=1&showinfo=0&controls=0"
                  title="CrossFit Academy Intro Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </section>
        <Features /> {/* Why Choose Us / Benefits Section */}
        {/* Our Trainers Section */}
        <section id="trainers" className="py-16 md:py-24 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-center text-4xl md:text-5xl font-extrabold text-primary-900 mb-12 font-oswald uppercase"
            >
              Meet Our Expert Coaches
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trainers.map((trainer, index) => (
                <motion.div
                  key={trainer.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 ease-in-out group"
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-primary-800 mb-2 font-oswald uppercase">
                      {trainer.name}
                    </h3>
                    <p className="text-primary-600 text-lg mb-4 font-semibold">{trainer.role}</p>
                    <p className="text-gray-600 text-base leading-relaxed">{trainer.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-primary-900 text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-center text-4xl md:text-5xl font-extrabold text-white mb-12 font-oswald uppercase"
            >
              Our Flexible Pricing
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative bg-white rounded-lg shadow-xl p-8 flex flex-col justify-between h-full transform transition-all duration-300 ease-in-out
                  ${plan.highlight ? 'ring-4 ring-accent-500 scale-[1.05] z-10' : 'hover:scale-[1.02]'}`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-sm font-bold uppercase px-4 py-1 rounded-full shadow-md">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-primary-800 mb-4 font-oswald uppercase">
                      {plan.name}
                    </h3>
                    <p className="text-primary-600 text-6xl font-extrabold mb-4">
                      ${plan.price}
                      <span className="text-2xl font-medium">/{plan.frequency}</span>
                    </p>
                    <ul className="text-gray-700 text-lg mb-8 space-y-3">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-green-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mt-auto w-full py-4 rounded-lg font-bold text-xl uppercase transition-colors duration-300
                    ${plan.highlight ? 'bg-accent-500 text-white hover:bg-accent-600' : 'bg-primary-500 text-white hover:bg-primary-600'}`}
                    onClick={openModal}
                    aria-label={`Join ${plan.name} Plan`}
                  >
                    {plan.cta}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Member's Success Story / Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-center text-4xl md:text-5xl font-extrabold text-primary-900 mb-12 font-oswald uppercase"
            >
              Hear From Our Members
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="bg-gray-100 p-8 rounded-lg shadow-md flex flex-col items-center text-center"
                >
                  <div className="relative w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-primary-500">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xl italic text-gray-800 mb-4 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <p className="font-bold text-primary-700 text-lg">- {testimonial.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Call to Action Section (Reciprocity Hint) */}
        <section className="bg-primary-800 text-white py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold font-oswald uppercase mb-6"
            >
              Ready to Transform Your Fitness Journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 leading-relaxed"
            >
              Join our community today and experience the difference of expert coaching and a
              supportive environment.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'var(--color-accent-600)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent-500 text-white text-xl md:text-2xl font-bold px-10 py-5 rounded-full uppercase shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent-400 focus:ring-offset-2"
              onClick={openModal}
              aria-label="Get Started Now"
            >
              Get Started Now
            </motion.button>
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-center text-4xl md:text-5xl font-extrabold text-primary-900 mb-12 font-oswald uppercase"
            >
              Find Us & Get in Touch
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
                className="rounded-lg shadow-xl overflow-hidden aspect-video w-full"
              >
                {/* Google Maps Embed with aspect-ratio for CLS */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.25134063185!2d144.963116!3d-37.817208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b3635e954f%3A0x673c6a2c300f074d!2sFederation%20Square!5e0!3m2!1sen!2smy!4v1678912345678!5m2!1sen!2smy"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CrossFit Academy Location"
                  aria-label="Google Map of CrossFit Academy location"
                ></iframe>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-white p-8 rounded-lg shadow-xl"
              >
                <h3 className="text-3xl font-bold text-primary-800 mb-6 font-oswald uppercase">
                  Send Us a Message
                </h3>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-gray-700 text-lg font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-lg"
                      placeholder="Your Name"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-gray-700 text-lg font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-lg"
                      placeholder="your@email.com"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-gray-700 text-lg font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-lg"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-primary-700 text-white font-bold text-xl uppercase py-4 rounded-lg shadow-md hover:bg-primary-800 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label="Send Message"
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Join Now Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal} // Close when clicking outside modal content
            aria-modal="true"
            role="dialog"
            aria-labelledby="join-modal-title"
            tabIndex={-1} // Make modal container focusable
            ref={modalRef}
          >
            <motion.div
              className={`bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative transition-transform ${formShake ? 'animate-shake' : ''}`}
              initial={{ y: -50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1"
                aria-label="Close form"
              >
                <X size={24} />
              </button>
              <h2
                id="join-modal-title"
                className="text-3xl font-bold text-primary-800 mb-6 text-center font-oswald uppercase"
              >
                Join Our Academy
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Fill out the form below and a representative will contact you shortly to discuss
                your fitness goals.
              </p>
              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="modal-name"
                    className="block text-gray-700 text-lg font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-lg"
                    placeholder="John Doe"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-email"
                    className="block text-gray-700 text-lg font-medium mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-lg"
                    placeholder="john.doe@example.com"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-phone"
                    className="block text-gray-700 text-lg font-medium mb-2"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-lg"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-accent-500 text-white font-bold text-xl uppercase py-4 rounded-lg shadow-md hover:bg-accent-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-accent-500 focus:ring-offset-2"
                  aria-label="Submit Join Request"
                >
                  Submit Request
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
