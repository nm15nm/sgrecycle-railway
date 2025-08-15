'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost, formatDate } from '@/lib/api';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface BlogPostContentProps {
  post: BlogPost;
}

interface ShareButtonProps {
  platform: string;
  url: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

function ShareButton({
  platform,
  url,
  title,
  description,
  icon,
  color,
}: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);

  const getShareUrl = () => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    switch (platform) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      case 'email':
        return `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0D%0A%0D%0A${encodedUrl}`;
      default:
        return '#';
    }
  };

  const handleShare = async () => {
    setIsSharing(true);

    // Check if Web Share API is available
    if (navigator.share && platform === 'native') {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback to opening share URL
      window.open(getShareUrl(), '_blank', 'width=600,height=400');
    }

    setTimeout(() => setIsSharing(false), 1000);
  };

  return (
    <motion.button
      onClick={handleShare}
      disabled={isSharing}
      className={`flex items-center justify-center w-12 h-12 rounded-full ${color} text-white hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={`Share on ${platform}`}
    >
      {isSharing ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        icon
      )}
    </motion.button>
  );
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareButtons = [
    {
      platform: 'twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      platform: 'facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      platform: 'linkedin',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: 'bg-blue-700 hover:bg-blue-800',
    },
    {
      platform: 'email',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  return (
    <motion.article
      className="min-h-screen bg-gradient-to-br from-sky-blue/5 to-eco-green/5"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Hero Section */}
      <motion.section
        className="relative py-16 lg:py-24 bg-deep-blue text-white"
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <motion.nav className="mb-8" variants={fadeInUp}>
              <Link
                href="/blog"
                className="text-sky-blue hover:text-white transition-colors duration-200"
              >
                ← Back to Blog
              </Link>
            </motion.nav>

            {/* Title */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              variants={fadeInUp}
            >
              {post.title}
            </motion.h1>

            {/* Meta Information */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 text-sky-blue/90 mb-8"
              variants={fadeInUp}
            >
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
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
              </span>

              {post.readingTime && (
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {post.readingTime} min read
                </span>
              )}

              {post.author && (
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {post.author.name}
                </span>
              )}
            </motion.div>

            {/* Excerpt */}
            {post.excerpt && (
              <motion.p
                className="text-xl text-sky-blue/90 leading-relaxed max-w-3xl mx-auto"
                variants={fadeInUp}
              >
                {post.excerpt}
              </motion.p>
            )}
          </div>
        </div>
      </motion.section>

      {/* Featured Image */}
      {post.featuredImage && (
        <motion.section className="relative" variants={fadeInUp}>
          <div className="container mx-auto px-4 -mt-12 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Content */}
      <motion.section className="py-16 lg:py-24" variants={fadeInUp}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Article Content */}
              <div className="lg:col-span-3">
                <motion.div
                  className="prose prose-lg max-w-none prose-headings:text-deep-blue prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-eco-green hover:prose-a:text-eco-green/80 prose-strong:text-deep-blue prose-ul:text-gray-700 prose-ol:text-gray-700"
                  variants={fadeInUp}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <motion.div
                    className="mt-12 pt-8 border-t border-neutral-gray/30"
                    variants={fadeInUp}
                  >
                    <h3 className="text-lg font-semibold text-deep-blue mb-4">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-eco-green/10 text-eco-green px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  className="sticky top-24 space-y-8"
                  variants={fadeInUp}
                >
                  {/* Share Buttons */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-gray/20">
                    <h3 className="text-lg font-semibold text-deep-blue mb-4">
                      Share this article
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {shareButtons.map(button => (
                        <ShareButton
                          key={button.platform}
                          platform={button.platform}
                          url={currentUrl}
                          title={post.title}
                          description={post.excerpt || post.title}
                          icon={button.icon}
                          color={button.color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Author Info */}
                  {post.author && (
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-gray/20">
                      <h3 className="text-lg font-semibold text-deep-blue mb-4">
                        About the Author
                      </h3>
                      <div className="flex items-center space-x-3">
                        {post.author.avatar && (
                          <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-deep-blue">
                            {post.author.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Environmental Technology Expert
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Call to Action */}
                  <div className="bg-gradient-to-br from-eco-green to-eco-green/90 rounded-xl p-6 text-white">
                    <h3 className="text-lg font-semibold mb-3">
                      Ready to get started?
                    </h3>
                    <p className="text-sm mb-4 opacity-90">
                      Learn more about our sustainable recycling solutions.
                    </p>
                    <Link
                      href="/contact"
                      className="block w-full bg-white text-eco-green text-center py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                    >
                      Contact Us
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Related Posts CTA */}
      <motion.section className="py-16 bg-neutral-gray/10" variants={fadeInUp}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-deep-blue mb-4">
              Explore More Insights
            </h2>
            <p className="text-gray-700 mb-8">
              Discover more articles about sustainable recycling and
              environmental technology.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center bg-eco-green hover:bg-eco-green/90 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
            >
              View All Posts
              <svg
                className="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.article>
  );
}
