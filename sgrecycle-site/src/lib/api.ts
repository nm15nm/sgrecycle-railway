// Types for blog posts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  publishedDate: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  readingTime?: number;
}

// Placeholder API functions (will be replaced with actual Strapi API calls)
const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Revolutionary Plastic Bottle Recycling Technology',
    slug: 'revolutionary-plastic-bottle-recycling-technology',
    excerpt:
      'Discover how our latest recycling machines are transforming plastic waste into valuable resources, reducing environmental impact while creating economic opportunities.',
    content: `
      <h2>Introduction to Advanced Recycling</h2>
      <p>The future of waste management lies in innovative recycling technologies that can transform what was once considered waste into valuable resources. Our revolutionary plastic bottle recycling machines represent a breakthrough in sustainable technology.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>99.5% efficiency rate in plastic separation</li>
        <li>Automated sorting and cleaning systems</li>
        <li>Real-time quality monitoring</li>
        <li>Energy-efficient operations</li>
      </ul>
      
      <h3>Environmental Impact</h3>
      <p>Each machine can process up to 1,000 bottles per hour, significantly reducing the amount of plastic waste that ends up in landfills or oceans. This technology represents a crucial step toward achieving Singapore's zero waste goals.</p>
      
      <h3>Economic Benefits</h3>
      <p>Communities using our recycling systems have reported:</p>
      <ul>
        <li>30% reduction in waste management costs</li>
        <li>Creation of new jobs in the recycling sector</li>
        <li>Revenue generation from recycled materials</li>
        <li>Improved community engagement in sustainability</li>
      </ul>
      
      <h3>Future Developments</h3>
      <p>We're continuously improving our technology with planned upgrades including AI-powered sorting, IoT connectivity for remote monitoring, and enhanced material recovery rates.</p>
    `,
    featuredImage: '/images/blog/recycling-technology.jpg',
    publishedDate: '2025-08-10',
    author: {
      name: 'Dr. Sarah Chen',
      avatar: '/images/authors/sarah-chen.jpg',
    },
    tags: ['Technology', 'Recycling', 'Innovation'],
    readingTime: 5,
  },
  {
    id: '2',
    title: "Singapore's Journey Toward Zero Waste",
    slug: 'singapore-journey-toward-zero-waste',
    excerpt:
      "Exploring Singapore's ambitious zero waste goals and how innovative recycling solutions are helping the nation lead by example in sustainable waste management.",
    content: `
      <h2>Singapore's Zero Waste Vision</h2>
      <p>Singapore has set an ambitious goal to become a zero waste nation, and recycling technology plays a crucial role in achieving this vision. The government's comprehensive approach combines policy, technology, and community engagement.</p>
      
      <h3>Current Achievements</h3>
      <p>Singapore has already made significant progress:</p>
      <ul>
        <li>60% recycling rate for non-domestic waste</li>
        <li>Implementation of the Packaging Partnership Programme</li>
        <li>Development of integrated waste management facilities</li>
        <li>Investment in research and development</li>
      </ul>
      
      <h3>Role of Technology</h3>
      <p>Advanced recycling machines are essential to meeting Singapore's zero waste goals. Our technology contributes by:</p>
      <ul>
        <li>Increasing recycling efficiency</li>
        <li>Reducing contamination in recycled materials</li>
        <li>Enabling local processing of recyclables</li>
        <li>Supporting circular economy principles</li>
      </ul>
      
      <h3>Community Involvement</h3>
      <p>Success depends on community participation. Educational programs and accessible recycling infrastructure encourage citizens to adopt sustainable practices.</p>
    `,
    featuredImage: '/images/blog/singapore-zero-waste.jpg',
    publishedDate: '2025-08-05',
    author: {
      name: 'Michael Tan',
      avatar: '/images/authors/michael-tan.jpg',
    },
    tags: ['Singapore', 'Zero Waste', 'Sustainability'],
    readingTime: 4,
  },
  {
    id: '3',
    title: 'The Economics of Paper Recycling',
    slug: 'economics-of-paper-recycling',
    excerpt:
      'Understanding the economic benefits of paper recycling and how modern technology is making it more profitable and environmentally friendly than ever before.',
    content: `
      <h2>Paper Recycling: An Economic Perspective</h2>
      <p>Paper recycling has evolved from an environmental necessity to a profitable business opportunity. Modern recycling technology has transformed the economics of paper waste management.</p>
      
      <h3>Market Dynamics</h3>
      <p>The global paper recycling market has seen significant growth:</p>
      <ul>
        <li>Increasing demand for recycled paper products</li>
        <li>Rising costs of virgin fiber</li>
        <li>Growing environmental awareness</li>
        <li>Government incentives and regulations</li>
      </ul>
      
      <h3>Technology Advantages</h3>
      <p>Our paper recycling machines offer superior economic benefits:</p>
      <ul>
        <li>Higher quality output reducing processing costs</li>
        <li>Automated operations minimizing labor costs</li>
        <li>Energy-efficient design reducing operational expenses</li>
        <li>Minimal maintenance requirements</li>
      </ul>
      
      <h3>Return on Investment</h3>
      <p>Businesses investing in our paper recycling technology typically see:</p>
      <ul>
        <li>Payback period of 18-24 months</li>
        <li>20-30% reduction in waste disposal costs</li>
        <li>Revenue generation from recycled materials</li>
        <li>Improved corporate sustainability ratings</li>
      </ul>
    `,
    featuredImage: '/images/blog/paper-recycling-economics.jpg',
    publishedDate: '2025-07-28',
    author: {
      name: 'Jennifer Wong',
      avatar: '/images/authors/jennifer-wong.jpg',
    },
    tags: ['Economics', 'Paper Recycling', 'ROI'],
    readingTime: 6,
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  await delay(500); // Simulate network delay
  return PLACEHOLDER_POSTS.sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  await delay(300); // Simulate network delay
  const post = PLACEHOLDER_POSTS.find(post => post.slug === slug);
  return post || null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  await delay(200); // Simulate network delay
  return PLACEHOLDER_POSTS.map(post => post.slug);
}

export async function getFeaturedBlogPosts(
  limit: number = 3
): Promise<BlogPost[]> {
  await delay(400); // Simulate network delay
  return PLACEHOLDER_POSTS.slice(0, limit);
}

// Calculate reading time based on content
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = textContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
