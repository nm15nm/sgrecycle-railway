'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-gray/20 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo
              variant="compact"
              size="medium"
              animated={true}
              priority={true}
              className="hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-deep-blue font-semibold hover:text-eco-green transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-eco-green transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="bg-eco-green text-white px-6 py-2 rounded-full font-semibold hover:bg-eco-green/90 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get Quote
              </Link>
            </motion.div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative w-6 h-6 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                className={cn(
                  'absolute h-0.5 w-6 bg-deep-blue transform transition duration-300 ease-in-out',
                  isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                )}
              />
              <span
                className={cn(
                  'absolute h-0.5 w-6 bg-deep-blue transform transition duration-300 ease-in-out',
                  isMenuOpen ? 'opacity-0' : ''
                )}
              />
              <span
                className={cn(
                  'absolute h-0.5 w-6 bg-deep-blue transform transition duration-300 ease-in-out',
                  isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-neutral-gray/20"
            >
              <div className="py-4 space-y-4">
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-deep-blue font-semibold hover:text-eco-green transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="block bg-eco-green text-white px-6 py-3 rounded-full font-semibold text-center hover:bg-eco-green/90 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
