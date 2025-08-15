'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { getAllBlogPosts, formatDate, BlogPost } from '@/lib/api';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const blogPosts = await getAllBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Filter posts based on search term and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      (post.tags && post.tags.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = [
    'All',
    ...Array.from(new Set(posts.flatMap(post => post.tags || []))),
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-blue/5 to-eco-green/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-eco-green"></div>
          <p className="mt-4 text-deep-blue">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-sky-blue/5 to-eco-green/5"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Hero Section */}
      <motion.section
        className="py-16 lg:py-24 bg-deep-blue text-white"
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={fadeInUp}
            >
              Sustainability Insights
            </motion.h1>
            <motion.p
              className="text-xl text-sky-blue/90 leading-relaxed max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Discover the latest in recycling technology, environmental
              innovation, and sustainable practices from our team of experts.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Search and Filter */}
      <motion.section className="py-12" variants={fadeInUp}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-neutral-gray/30 focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-auto">
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full lg:w-auto px-6 py-3 rounded-full border border-neutral-gray/30 focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <motion.div className="mb-8" variants={fadeInUp}>
              <p className="text-gray-600">
                {filteredPosts.length} article
                {filteredPosts.length !== 1 ? 's' : ''} found
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Blog Posts Grid */}
      <motion.section className="pb-16 lg:pb-24" variants={fadeInUp}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    variants={fadeInUp}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      {/* Featured Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={post.featuredImage || '/images/blog/default.jpg'}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading={index < 3 ? 'eager' : 'lazy'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="text-xs font-medium bg-eco-green/10 text-eco-green px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="text-xl font-bold text-deep-blue mb-3 group-hover:text-eco-green transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span>{formatDate(post.publishedDate)}</span>
                            {post.readingTime && (
                              <span>{post.readingTime} min read</span>
                            )}
                          </div>

                          {/* Read More Arrow */}
                          <div className="flex items-center text-eco-green group-hover:translate-x-1 transition-transform duration-200">
                            <span className="mr-1">Read more</span>
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            ) : (
              <motion.div className="text-center py-16" variants={fadeInUp}>
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-deep-blue mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedCategory !== 'All'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Check back soon for new articles!'}
                </p>
                {(searchTerm || selectedCategory !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                    }}
                    className="bg-eco-green hover:bg-eco-green/90 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-eco-green text-white"
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              variants={fadeInUp}
            >
              Stay Updated with SG Recycle
            </motion.h2>
            <motion.p className="text-xl opacity-90 mb-8" variants={fadeInUp}>
              Subscribe to our newsletter for the latest insights on sustainable
              recycling and environmental technology.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              variants={fadeInUp}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-deep-blue hover:bg-deep-blue/90 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200">
                Subscribe
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
