'use client';

import { motion } from 'framer-motion';

export default function BlogLoading() {
  const SkeletonCard = ({ index }: { index: number }) => (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Image Skeleton */}
      <div className="relative h-64 bg-gradient-to-br from-neutral-gray/20 to-neutral-gray/40 animate-pulse">
        <div className="absolute top-4 left-4 w-20 h-6 bg-neutral-gray/60 rounded-full animate-pulse"></div>
        <div className="absolute top-4 right-4 w-16 h-6 bg-neutral-gray/60 rounded-full animate-pulse"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Date Skeleton */}
        <div className="flex items-center mb-3">
          <div className="w-4 h-4 bg-neutral-gray/40 rounded mr-2 animate-pulse"></div>
          <div className="w-24 h-4 bg-neutral-gray/40 rounded animate-pulse"></div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="w-full h-6 bg-neutral-gray/40 rounded animate-pulse"></div>
          <div className="w-3/4 h-6 bg-neutral-gray/40 rounded animate-pulse"></div>
        </div>

        {/* Excerpt Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="w-full h-4 bg-neutral-gray/30 rounded animate-pulse"></div>
          <div className="w-full h-4 bg-neutral-gray/30 rounded animate-pulse"></div>
          <div className="w-2/3 h-4 bg-neutral-gray/30 rounded animate-pulse"></div>
        </div>

        {/* Button Skeleton */}
        <div className="flex items-center justify-between">
          <div className="w-20 h-6 bg-neutral-gray/40 rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-neutral-gray/40 rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-sky-blue/5 to-eco-green/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container mx-auto px-4 py-16">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <motion.div
            className="w-64 h-12 bg-neutral-gray/40 rounded-lg mx-auto mb-6 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          ></motion.div>
          <motion.div
            className="w-96 h-6 bg-neutral-gray/30 rounded mx-auto mb-2 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          ></motion.div>
          <motion.div
            className="w-80 h-6 bg-neutral-gray/30 rounded mx-auto animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          ></motion.div>
        </div>

        {/* Category Filter Skeleton */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[1, 2, 3, 4, 5, 6].map(item => (
            <div
              key={item}
              className="w-20 h-10 bg-neutral-gray/40 rounded-full animate-pulse"
            ></div>
          ))}
        </motion.div>

        {/* Blog Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <SkeletonCard key={item} index={index} />
          ))}
        </div>

        {/* Loading Animation */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="inline-flex items-center justify-center space-x-2">
            <motion.div
              className="w-3 h-3 bg-eco-green rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            ></motion.div>
            <motion.div
              className="w-3 h-3 bg-sky-blue rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            ></motion.div>
            <motion.div
              className="w-3 h-3 bg-deep-blue rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            ></motion.div>
          </div>
          <p className="text-gray-600 mt-4">Loading latest insights...</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
