import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - SG Recycle',
  description:
    'Get in touch with SG Recycle for sustainable recycling solutions. Contact our team for quotes, partnerships, and support.',
  openGraph: {
    title: 'Contact Us - SG Recycle',
    description:
      'Ready to transform your waste management? Contact SG Recycle for innovative recycling solutions.',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
