'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type LogoVariant = 'full' | 'compact' | 'mark';
type LogoSize = 'small' | 'medium' | 'large' | 'extra-large';

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  animated?: boolean;
  className?: string;
  priority?: boolean;
}

const sizeClasses = {
  small: 'h-8 w-auto',
  medium: 'h-12 w-auto',
  large: 'h-20 w-auto',
  'extra-large': 'h-32 w-auto',
};

const logoSources = {
  full: '/images/logos/sg-logo-full.svg',
  compact: '/images/logos/sg-logo-compact.svg',
  mark: '/images/logos/sg-logo-mark.svg',
};

export default function Logo({
  variant = 'full',
  size = 'medium',
  animated = false,
  className,
  priority = false,
}: LogoProps) {
  const logoSrc = logoSources[variant];
  const sizeClass = sizeClasses[size];

  const logoElement = (
    <Image
      src={logoSrc}
      alt="SG Recycle Logo"
      width={200}
      height={80}
      className={cn(sizeClass, className)}
      priority={priority}
    />
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
      >
        {logoElement}
      </motion.div>
    );
  }

  return logoElement;
}
