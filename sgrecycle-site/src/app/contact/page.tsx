'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  subject: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    subject: 'general',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, you would send data to your backend
      console.log('Form submitted:', formData);

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        subject: 'general',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: 'Visit Our Office',
      details: [
        '123 Innovation Drive',
        'Singapore Science Park',
        'Singapore 138588',
      ],
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
      title: 'Call Us',
      details: ['+65 6789 1234', '+65 9123 4567 (Mobile)'],
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      title: 'Email Us',
      details: ['hello@sgrecycle.com', 'partnerships@sgrecycle.com'],
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: 'Business Hours',
      details: [
        'Monday - Friday: 8:00 AM - 6:00 PM',
        'Saturday: 9:00 AM - 2:00 PM',
      ],
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-blue/5 to-eco-green/5 flex items-center justify-center">
        <motion.div
          className="max-w-md mx-auto text-center px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-eco-green rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-deep-blue mb-4">
              Message Sent Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for contacting SG Recycle. We&apos;ll get back to you
              within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-eco-green hover:bg-eco-green/90 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
            >
              Send Another Message
            </button>
          </div>
        </motion.div>
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
              Get in Touch
            </motion.h1>
            <motion.p
              className="text-xl text-sky-blue/90 leading-relaxed max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Ready to transform your waste management? Partner with SG Recycle
              for innovative, sustainable recycling solutions that make a real
              impact.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Contact Form & Info */}
      <motion.section className="py-16 lg:py-24" variants={fadeInUp}>
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl font-bold text-deep-blue mb-8">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Have questions about our recycling solutions? Want to explore
                  partnership opportunities? We&apos;re here to help you create
                  a more sustainable future.
                </p>

                <div className="space-y-8">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="flex items-start space-x-4"
                      variants={fadeInUp}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-eco-green rounded-lg flex items-center justify-center text-white">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-deep-blue mb-2">
                          {item.title}
                        </h3>
                        {item.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <motion.div className="mt-12" variants={fadeInUp}>
                  <h3 className="font-semibold text-deep-blue mb-4">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    {[
                      { name: 'LinkedIn', href: '#' },
                      { name: 'Twitter', href: '#' },
                      { name: 'Facebook', href: '#' },
                    ].map(social => (
                      <a
                        key={social.name}
                        href={social.href}
                        className="w-10 h-10 bg-neutral-gray/20 hover:bg-eco-green rounded-lg flex items-center justify-center text-deep-blue hover:text-white transition-colors duration-200"
                      >
                        <span className="sr-only">{social.name}</span>
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0z" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="bg-white rounded-2xl shadow-xl p-8"
                variants={fadeInUp}
              >
                <h2 className="text-3xl font-bold text-deep-blue mb-8">
                  Send us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-deep-blue mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green transition-colors ${
                        errors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-neutral-gray/30'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-deep-blue mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-neutral-gray/30'
                      }`}
                      placeholder="your.email@company.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Company Field */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-deep-blue mb-2"
                    >
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green transition-colors"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-deep-blue mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green transition-colors"
                      placeholder="+65 1234 5678"
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-deep-blue mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green transition-colors"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="partnership">
                        Partnership Opportunity
                      </option>
                      <option value="quote">Request a Quote</option>
                      <option value="support">Technical Support</option>
                      <option value="media">Media & Press</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-deep-blue mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green transition-colors resize-none ${
                        errors.message
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-neutral-gray/30'
                      }`}
                      placeholder="Tell us about your recycling needs, partnership ideas, or any questions you have..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-eco-green hover:bg-eco-green/90 disabled:bg-neutral-gray disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg
                          className="w-5 h-5 ml-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
