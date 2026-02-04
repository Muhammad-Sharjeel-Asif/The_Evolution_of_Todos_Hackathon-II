/**
 * Contact Us Page
 * Simple, accessible contact form for users to reach out
 * Polished with premium micro-animations
 * UI-only implementation (no backend logic)
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '@/components/layout';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    message: false,
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only: Show success message (no backend)
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (field: string) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field: string) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background Glow Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

      {/* Shared Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Page Title - Soft fade-in */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-extrabold text-white mb-6 text-center tracking-tight"
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Us</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-text mb-12 text-center leading-relaxed"
          >
            Have questions or feedback? We'd love to hear from you.
            Send us a message and we'll respond as soon as possible.
          </motion.p>

          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            className="bg-card/40 backdrop-blur-md border border-indigo-500/10 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-indigo-500/5 relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  required
                  className={`w-full px-4 py-3 bg-card/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${isFocused.name
                    ? 'border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-500/10'
                    : 'border-indigo-500/10 hover:border-indigo-500/30'
                    }`}
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  required
                  className={`w-full px-4 py-3 bg-card/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${isFocused.email
                    ? 'border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-500/10'
                    : 'border-indigo-500/10 hover:border-indigo-500/30'
                    }`}
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 bg-card/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none ${isFocused.message
                    ? 'border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-500/10'
                    : 'border-indigo-500/10 hover:border-indigo-500/30'
                    }`}
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              {/* Submit Button - Gentle hover + press animation */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-background text-lg"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Additional Contact Info */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <p className="text-gray-text text-sm">
              You can also reach us at{' '}
              <a
                href="mailto:hello@taskify.app"
                className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 underline decoration-indigo-500/40 hover:decoration-indigo-500/70"
              >
                hello@taskify.app
              </a>
            </p>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-indigo-500/10 py-8 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-text text-sm">
            © 2026 Taskify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
