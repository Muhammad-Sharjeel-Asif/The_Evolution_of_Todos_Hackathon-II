/**
 * Landing Page - Professional Home Page for Todo Application
 * Polished, premium design with calm animations
 * Focus on clarity, simplicity, and professionalism
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '../components/ui/Button';
import { useAuth } from '@/lib/context/AuthContext';
import { Navbar } from '@/components/layout';

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const handleStartFree = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };
  // Calm, professional animation variants
  const fadeInSubtle = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-indigo-500/30">
      {/* Shared Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Glow Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="text-center"
          >
            {/* Main Heading */}
            <motion.h1
              variants={fadeInSubtle}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight"
            >
              Organize Your Life,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
                One Task at a Time
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInSubtle}
              className="text-lg sm:text-xl text-gray-text mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Taskify helps you stay productive and focused on what matters most.
              A beautiful, intuitive interface designed for peak performance.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInSubtle}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                variant="primary"
                onClick={handleStartFree}
                disabled={isLoading}
                className="text-base px-10 py-4 shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all duration-300"
              >
                Start Free
              </Button>
              <Link href="/dashboard">
                <Button
                  variant="secondary"
                  className="text-base px-10 py-4 hover:bg-indigo-500/5 transition-all duration-300"
                >
                  View Dashboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Analytics/Stats Section - Moved Higher & Compact */}
      <section id="stats" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-card/50 border border-indigo-500/10 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="text-center mb-8">
              <h2 className="text-lg font-semibold text-indigo-400 mb-1 uppercase tracking-wider">
                Trusted by Thousands
              </h2>
              <p className="text-sm text-gray-text">
                Join our growing community of productive professionals
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">12,000+</div>
                <div className="text-xs text-gray-text uppercase tracking-widest">Active Users</div>
              </div>

              <div className="text-center border-t border-b sm:border-t-0 sm:border-b-0 sm:border-l sm:border-r border-indigo-500/10 py-4 sm:py-0">
                <div className="text-3xl font-bold text-white mb-1">1.2M+</div>
                <div className="text-xs text-gray-text uppercase tracking-widest">Tasks Completed</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                <div className="text-xs text-gray-text uppercase tracking-widest">Uptime</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-text max-w-2xl mx-auto">
              Powerful features designed with simplicity in mind
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                title: 'Simple & Intuitive',
                desc: 'Clean interface that lets you focus on your tasks without distractions.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Lightning Fast',
                desc: 'Built with Next.js for instant page loads and smooth interactions.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'Fully Responsive',
                desc: 'Works seamlessly across desktop, tablet, and mobile devices.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: 'Secure & Reliable',
                desc: 'Your data is encrypted and backed up daily for maximum security.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              },
              {
                title: 'Real-time Sync',
                desc: 'Instant synchronization across all your devices and browsers.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )
              },
              {
                title: 'Collaborative',
                desc: 'Share lists and collaborate with team members in real-time.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-card border border-indigo-500/10 rounded-2xl p-8 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-text leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Get Organized?
          </h2>
          <p className="text-lg text-gray-text mb-10 leading-relaxed">
            Start managing your tasks effectively today. Join thousands of users
            who have transformed their productivity with Taskify.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="primary"
              onClick={handleStartFree}
              disabled={isLoading}
              className="text-lg px-12 py-4"
            >
              Start Free Now
            </Button>
            <Link href="/dashboard">
              <Button
                variant="secondary"
                className="text-lg px-12 py-4"
              >
                View Demo
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="footer" className="border-t border-indigo-500/10 py-16 px-4 sm:px-6 lg:px-8 mt-12 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center sm:text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
                <span className="text-2xl text-indigo-500">⚡</span>
                <span className="text-2xl font-bold text-white tracking-tight">Taskify</span>
              </div>
              <p className="text-gray-text leading-relaxed text-sm">
                The ultimate task management tool designed for professionals and teams.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Product</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/dashboard" className="text-gray-text hover:text-indigo-400 transition-colors text-sm font-medium">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-gray-text hover:text-indigo-400 transition-colors text-sm font-medium">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#stats" className="text-gray-text hover:text-indigo-400 transition-colors text-sm font-medium">
                    About
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Company</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-text hover:text-indigo-400 transition-colors text-sm font-medium">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-text hover:text-indigo-400 transition-colors text-sm font-medium">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-text hover:text-indigo-400 transition-colors text-sm font-medium">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Connect</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-text hover:text-indigo-400 transition-colors text-sm font-medium">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-text hover:text-indigo-400 transition-colors text-sm font-medium">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-text hover:text-indigo-400 transition-colors text-sm font-medium">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-indigo-500/5 pt-8 text-center sm:flex sm:justify-between items-center">
            <p className="text-gray-text text-sm mb-4 sm:mb-0">
              © 2026 Taskify. Built with passion for productivity.
            </p>
            <div className="flex justify-center space-x-6">
              <span className="text-gray-text text-xs uppercase tracking-tighter">Next.js</span>
              <span className="text-gray-text text-xs uppercase tracking-tighter">Tailwind CSS</span>
              <span className="text-gray-text text-xs uppercase tracking-tighter">Framer Motion</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
