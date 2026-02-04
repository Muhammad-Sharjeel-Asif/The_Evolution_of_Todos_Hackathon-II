/**
 * About Us Page
 * Professional, product-focused explanation of Taskify's mission and values
 * Polished with premium micro-animations
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '@/components/layout';

export default function AboutPage() {
  // Refined animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const sectionFadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background Glow Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

      {/* Shared Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Page Title - Soft fade-in with upward motion */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-extrabold text-white mb-6 text-center tracking-tight"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Us</span>
          </motion.h1>

          {/* Mission Statement */}
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-text mb-16 text-center max-w-3xl mx-auto leading-relaxed"
          >
            We believe productivity should be simple, not overwhelming.
            Taskify helps you organize your work and life with clarity and focus.
          </motion.p>

          {/* Content Sections - Staggered fade-in on scroll */}
          <div className="space-y-12">
            {/* Problem We Solve */}
            <motion.section
              {...sectionFadeIn}
              className="bg-card/40 backdrop-blur-md border border-indigo-500/10 rounded-2xl p-8 sm:p-10 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                The Problem We Solve
              </h2>
              <p className="text-gray-text leading-relaxed text-base mb-4">
                Most task management tools are bloated with features you don't need. They try to do everything
                and end up making simple tasks complicated.
              </p>
              <p className="text-gray-text leading-relaxed text-base">
                We saw people struggling with overcomplicated systems when all they needed was a clear,
                straightforward way to track what matters. That's why we built Taskify.
              </p>
            </motion.section>

            {/* How We Help */}
            <motion.section
              {...sectionFadeIn}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card/40 backdrop-blur-md border border-indigo-500/10 rounded-2xl p-8 sm:p-10 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                How Taskify Helps You
              </h2>
              <p className="text-gray-text leading-relaxed text-base mb-4">
                Taskify strips away the complexity and gives you exactly what you need: a beautiful,
                fast interface to capture tasks, organize priorities, and get things done.
              </p>
              <p className="text-gray-text leading-relaxed text-base mb-4">
                No learning curve. No feature overload. Just open it and start working.
              </p>
              <p className="text-gray-text leading-relaxed text-base">
                Whether you're managing personal projects, work deadlines, or daily routines,
                Taskify adapts to your workflow without getting in your way.
              </p>
            </motion.section>

            {/* Vision & Values */}
            <motion.section
              {...sectionFadeIn}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card/40 backdrop-blur-md border border-indigo-500/10 rounded-2xl p-8 sm:p-10 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                Our Vision & Values
              </h2>
              <div className="space-y-4">
                <div className="group">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-200">
                    Focus
                  </h3>
                  <p className="text-gray-text leading-relaxed text-base">
                    We design for clarity. Every feature exists to help you focus on what matters,
                    not to impress you with options.
                  </p>
                </div>
                <div className="group">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-200">
                    Simplicity
                  </h3>
                  <p className="text-gray-text leading-relaxed text-base">
                    Complexity is easy. True simplicity requires discipline. We say no to features
                    that don't serve your core workflow.
                  </p>
                </div>
                <div className="group">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-200">
                    Productivity
                  </h3>
                  <p className="text-gray-text leading-relaxed text-base">
                    Your time is valuable. Taskify is built to be fast, reliable, and respectful
                    of your attention. No distractions, no friction.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 text-center"
          >
            <p className="text-gray-text mb-6 text-lg">
              Ready to simplify your workflow?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/login"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-105 active:scale-100 transition-all duration-300"
              >
                Start Free
              </Link>
              <Link
                href="/dashboard"
                className="inline-block bg-background border-2 border-indigo-500/30 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-500/10 hover:border-indigo-500 hover:scale-105 active:scale-100 transition-all duration-300"
              >
                View Dashboard
              </Link>
            </div>
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
