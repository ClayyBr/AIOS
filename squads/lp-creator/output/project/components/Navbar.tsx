import Link from 'next/link';
import { Rocket } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-primary-900 sticky top-0 z-50 shadow-lg shadow-primary-900/20">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <Rocket className="w-7 h-7 text-accent-500 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-2xl font-bold text-textPrimary group-hover:text-white transition-colors duration-200">
            FintechPro
          </span>
        </Link>
        <div className="space-x-4">
          <Link href="#features" className="text-textSecondary hover:text-white transition-colors duration-200">
            Features
          </Link>
          <Link href="#testimonials" className="text-textSecondary hover:text-white transition-colors duration-200">
            Testimonials
          </Link>
          <Link
            href="#contact"
            className="px-5 py-2 bg-accent-500 text-white rounded-lg hover:bg-violet-600 transition-colors duration-200 shadow-md shadow-accent-900/30"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
