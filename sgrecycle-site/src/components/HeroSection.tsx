'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function HeroSection() {
  const recyclingAnimationRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const machineRef = useRef<HTMLDivElement>(null);
  const newProductsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
        // Initial setup
        gsap.set([bottleRef.current, paperRef.current], {
          x: -300,
          opacity: 0,
          scale: 0.8,
        });

        gsap.set(machineRef.current, {
          scale: 0.9,
          rotation: 0,
        });

        gsap.set(newProductsRef.current, {
          x: 300,
          opacity: 0,
          scale: 0.8,
        });

        // Create the animation timeline
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

        // Step 1: Waste items move in
        tl.to([bottleRef.current, paperRef.current], {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          stagger: 0.3,
        })
          // Step 2: Items move towards machine
          .to([bottleRef.current, paperRef.current], {
            x: 50,
            scale: 0.6,
            duration: 1,
            ease: 'power2.inOut',
          })
          // Step 3: Machine processing animation
          .to(
            machineRef.current,
            {
              scale: 1.1,
              rotation: 360,
              duration: 2,
              ease: 'power2.inOut',
            },
            '-=0.5'
          )
          // Step 4: Items disappear into machine
          .to(
            [bottleRef.current, paperRef.current],
            {
              opacity: 0,
              scale: 0.2,
              x: 100,
              duration: 0.8,
              ease: 'power2.in',
            },
            '-=1'
          )
          // Step 5: New products emerge
          .to(
            newProductsRef.current,
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: 'power2.out',
            },
            '-=0.5'
          )
          // Step 6: Reset for next cycle
          .to(
            newProductsRef.current,
            {
              x: 300,
              opacity: 0,
              scale: 0.8,
              duration: 1,
              ease: 'power2.in',
            },
            '+=1.5'
          )
          .to(
            machineRef.current,
            {
              scale: 0.9,
              rotation: 0,
              duration: 1,
              ease: 'power2.out',
            },
            '-=0.5'
          )
          .set([bottleRef.current, paperRef.current], {
            x: -300,
            opacity: 0,
            scale: 0.8,
          });
      }, recyclingAnimationRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-sky-blue/10 to-eco-green/10 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-eco-green rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-deep-blue rounded-full"></div>
        <div className="absolute bottom-32 left-40 w-28 h-28 bg-sky-blue rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-eco-green rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-deep-blue mb-6 leading-tight"
              variants={fadeInUp}
            >
              Reimagining Waste for a{' '}
              <span className="text-eco-green">Sustainable Future</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed"
              variants={fadeInUp}
            >
              To revolutionise waste management through innovation, transforming
              recyclables into valuable resources and empowering communities to
              lead the shift toward a circular economy.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={fadeInUp}
            >
              <motion.button
                className="bg-deep-blue hover:bg-eco-green text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Partner with Us
              </motion.button>

              <motion.button
                className="border-2 border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Recycling Animation */}
          <motion.div
            className="relative h-96 lg:h-[500px]"
            ref={recyclingAnimationRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Waste Items (Left) */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 space-y-8">
              {/* Plastic Bottle */}
              <div
                ref={bottleRef}
                className="w-16 h-20 bg-gradient-to-b from-sky-blue to-sky-blue/70 rounded-lg relative"
              >
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-sky-blue/90 rounded-t-lg"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-white/30 rounded-full"></div>
              </div>

              {/* Paper */}
              <div
                ref={paperRef}
                className="w-14 h-16 bg-gradient-to-br from-neutral-gray to-gray-300 transform rotate-12 relative"
              >
                <div className="absolute inset-2 border-l-2 border-gray-400 space-y-1">
                  <div className="h-1 bg-gray-400 w-8"></div>
                  <div className="h-1 bg-gray-400 w-6"></div>
                  <div className="h-1 bg-gray-400 w-7"></div>
                </div>
              </div>
            </div>

            {/* Recycling Machine (Center) */}
            <div
              ref={machineRef}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-eco-green to-eco-green/80 rounded-xl relative shadow-lg">
                {/* Machine face */}
                <div className="absolute inset-2 bg-eco-green/20 rounded-lg border-2 border-white/30">
                  {/* Hexagon logo */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="currentColor"
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                </div>
                {/* Processing indicator */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-sky-blue rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* New Products (Right) */}
            <div
              ref={newProductsRef}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 space-y-6"
            >
              {/* Recycled Plastic Product */}
              <div className="w-12 h-12 bg-gradient-to-br from-eco-green to-eco-green/70 rounded-lg relative">
                <div className="absolute inset-1 bg-white/20 rounded-md"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg width="16" height="16" fill="white" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Recycled Paper Product */}
              <div className="w-12 h-14 bg-gradient-to-br from-deep-blue to-deep-blue/70 rounded relative">
                <div className="absolute inset-1 bg-white/90 rounded-sm">
                  <div className="absolute top-1 left-1 right-1 space-y-0.5">
                    <div className="h-0.5 bg-deep-blue/60 w-full"></div>
                    <div className="h-0.5 bg-deep-blue/60 w-3/4"></div>
                    <div className="h-0.5 bg-deep-blue/60 w-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flow Arrows */}
            <div className="absolute left-20 top-1/2 transform -translate-y-1/2">
              <svg width="60" height="20" className="text-eco-green/60">
                <defs>
                  <marker
                    id="arrowhead1"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                  </marker>
                </defs>
                <line
                  x1="5"
                  y1="10"
                  x2="50"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead1)"
                />
              </svg>
            </div>

            <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
              <svg width="60" height="20" className="text-eco-green/60">
                <defs>
                  <marker
                    id="arrowhead2"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                  </marker>
                </defs>
                <line
                  x1="10"
                  y1="10"
                  x2="55"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead2)"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex flex-col items-center text-deep-blue">
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
