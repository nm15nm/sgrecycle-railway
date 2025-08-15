import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostContent from '@/components/BlogPostContent';
import { getBlogPost, getAllBlogSlugs } from '@/lib/api';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug);

    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    return {
      title: post.title,
      description: post.excerpt || post.title,
      openGraph: {
        title: post.title,
        description: post.excerpt || post.title,
        type: 'article',
        publishedTime: post.publishedDate,
        images: post.featuredImage
          ? [
              {
                url: post.featuredImage,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || post.title,
        images: post.featuredImage ? [post.featuredImage] : [],
      },
    };
  } catch {
    return {
      title: 'Error Loading Post',
      description: 'An error occurred while loading the blog post.',
    };
  }
}

// Generate static params for static generation
export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    return slugs.map(slug => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getBlogPost(params.slug);

    if (!post) {
      notFound();
    }

    return <BlogPostContent post={post} />;
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}
