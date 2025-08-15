'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  publishedDate: string;
  readTime: number;
  category: string;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Technology: 'bg-sky-blue text-white',
      Sustainability: 'bg-eco-green text-white',
      Community: 'bg-deep-blue text-white',
      Innovation: 'bg-eco-green/80 text-white',
      Business: 'bg-deep-blue/80 text-white',
    };
    return (
      colors[category as keyof typeof colors] ||
      'bg-neutral-gray text-deep-blue'
    );
  };

  return (
    <motion.article
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/blog/${post.slug}`}>
        {/* Featured Image */}
        <div className="relative h-64 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-sky-blue/20 to-eco-green/20 flex items-center justify-center">
            {/* Placeholder for featured image */}
            <div className="text-center">
              <svg
                className="w-16 h-16 text-eco-green mx-auto mb-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-eco-green font-semibold">Featured Image</p>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}
            >
              {post.category}
            </span>
          </div>

          {/* Read Time Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-deep-blue">
              {post.readTime} min read
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Published Date */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            {formatDate(post.publishedDate)}
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-deep-blue mb-3 line-clamp-2 group-hover:text-eco-green transition-colors duration-300">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Read More Button */}
          <div className="flex items-center justify-between">
            <motion.span
              className="inline-flex items-center text-eco-green font-semibold group-hover:text-deep-blue transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              Read More
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.span>

            {/* Share Button */}
            <motion.button
              className="p-2 rounded-full hover:bg-eco-green/10 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={e => {
                e.preventDefault();
                // Share functionality placeholder
                console.log('Share post:', post.title);
              }}
            >
              <svg
                className="w-5 h-5 text-gray-400 hover:text-eco-green transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
