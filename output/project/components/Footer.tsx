import Link from 'next/link';
import { Facebook, Instagram, Twitter, Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-gray-300 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* Brand & Description */}
        <div className="col-span-full lg:col-span-1 mb-8 md:mb-0">
          <Link
            href="/"
            className="text-white text-3xl font-extrabold uppercase font-oswald tracking-wide flex items-center group mb-4"
            aria-label="CrossFit Academy Homepage"
          >
            <Dumbbell className="w-8 h-8 mr-2 text-accent-500 group-hover:rotate-12 transition-transform duration-300" />
            Academy
          </Link>
          <p className="text-gray-400 leading-relaxed text-base">
            Dedicated to building stronger individuals and a vibrant community through the power of
            CrossFit.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-xl font-bold mb-5 font-oswald uppercase">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="#about"
                className="hover:text-accent-400 transition-colors duration-200 text-base font-inter"
                aria-label="Go to About Us section"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#features"
                className="hover:text-accent-400 transition-colors duration-200 text-base font-inter"
                aria-label="Go to Features section"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#pricing"
                className="hover:text-accent-400 transition-colors duration-200 text-base font-inter"
                aria-label="Go to Pricing section"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="hover:text-accent-400 transition-colors duration-200 text-base font-inter"
                aria-label="Go to Contact section"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-xl font-bold mb-5 font-oswald uppercase">Contact Us</h3>
          <ul className="space-y-3 text-base">
            <li>
              <p>123 CrossFit Blvd, Fitness City, FC 12345</p>
            </li>
            <li>
              <a
                href="tel:+1234567890"
                className="hover:text-accent-400 transition-colors duration-200"
              >
                +1 (234) 567-890
              </a>
            </li>
            <li>
              <a
                href="mailto:info@crossfitacademy.com"
                className="hover:text-accent-400 transition-colors duration-200"
              >
                info@crossfitacademy.com
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white text-xl font-bold mb-5 font-oswald uppercase">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com/yourcrossfitacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent-500 transition-colors duration-200"
              aria-label="Follow us on Facebook"
            >
              <Facebook size={28} />
            </a>
            <a
              href="https://instagram.com/yourcrossfitacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent-500 transition-colors duration-200"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={28} />
            </a>
            <a
              href="https://twitter.com/yourcrossfitacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent-500 transition-colors duration-200"
              aria-label="Follow us on Twitter"
            >
              <Twitter size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-gray-700 text-center">
        <p className="text-gray-500 text-sm font-inter">
          &copy; {new Date().getFullYear()} CrossFit Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
