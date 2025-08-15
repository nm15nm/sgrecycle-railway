'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface CounterProps {
  value: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({
  value,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
    duration: duration * 1000,
  });
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', latest => {
      setDisplayValue(Math.round(latest));
    });

    return unsubscribe;
  }, [springValue]);

  return (
    <span
      ref={ref}
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-eco-green"
    >
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

const impactData = [
  {
    value: 15000,
    suffix: '+',
    label: 'Waste Diverted',
    unit: 'tons',
    description: 'Total waste processed and diverted from landfills',
    icon: (
      <svg
        className="w-12 h-12 text-eco-green"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    value: 250,
    suffix: '+',
    label: 'Communities Served',
    unit: 'locations',
    description: 'Communities across Singapore benefiting from our solutions',
    icon: (
      <svg
        className="w-12 h-12 text-eco-green"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        <path d="M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    ),
  },
  {
    value: 180,
    suffix: '+',
    label: 'Machines Deployed',
    unit: 'units',
    description: 'High-tech recycling machines in operation',
    icon: (
      <svg
        className="w-12 h-12 text-eco-green"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export default function ImpactCounter() {
  return (
    <motion.section
      className="py-16 lg:py-24 bg-gradient-to-r from-deep-blue to-deep-blue/90 text-white relative overflow-hidden"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-eco-green rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-sky-blue rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-eco-green rounded-full"></div>
        <div className="absolute bottom-10 right-1/3 w-36 h-36 bg-sky-blue rounded-full"></div>

        {/* Hexagon Pattern */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg width="200" height="200" className="text-eco-green/20">
            <path
              d="M100 20L170 60V140L100 180L30 140V60L100 20Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            variants={fadeInUp}
          >
            Our <span className="text-eco-green">Impact</span> by Numbers
          </motion.h2>
          <motion.p
            className="text-xl text-sky-blue/90 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Transforming Singapore&apos;s waste landscape through innovation and
            sustainable technology
          </motion.p>
        </motion.div>

        {/* Impact Counters */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto"
          variants={staggerContainer}
        >
          {impactData.map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Icon */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
              >
                {item.icon}
              </motion.div>

              {/* Animated Counter */}
              <div className="mb-4">
                <AnimatedCounter
                  value={item.value}
                  suffix={item.suffix}
                  duration={2.5}
                  delay={index * 0.3}
                />
              </div>

              {/* Label */}
              <motion.h3
                className="text-xl md:text-2xl font-bold text-deep-blue mb-2"
                style={{ color: 'white' }}
                variants={fadeInUp}
              >
                {item.label}
              </motion.h3>

              {/* Unit */}
              <motion.p
                className="text-sm font-semibold text-eco-green mb-3 uppercase tracking-wider"
                variants={fadeInUp}
              >
                {item.unit}
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-sky-blue/80 text-sm leading-relaxed"
                variants={fadeInUp}
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div className="text-center mt-16" variants={fadeInUp}>
          <motion.p
            className="text-lg text-sky-blue/90 mb-6"
            variants={fadeInUp}
          >
            Ready to join the sustainable revolution?
          </motion.p>
          <motion.button
            className="bg-eco-green hover:bg-eco-green/90 text-deep-blue font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeInUp}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
