/**
 * Navbar Component - Shared navigation bar for all pages
 * Includes AI Chat button that opens the half-screen drawer
 * Phase 3: Consistent navigation across the application
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/context/AuthContext';
import { useChatContext } from '@/lib/context/ChatContext';

interface NavbarProps {
  onLogout?: () => void;
  showDashboardLink?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLogout,
  showDashboardLink = true,
}) => {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const { toggleDrawer } = useChatContext();

  // const handleLogout = async () => {
  //   await logout();
  //   onLogout?.();
  // };

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full px-4 sm:px-6 lg:px-8 py-4 border-b border-indigo-500/20 bg-background/80 backdrop-blur-sm sticky top-0 z-30"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo - hide title on mobile to save space */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="text-indigo-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>
          <span className="hidden sm:inline text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">Taskify</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1 sm:space-x-4">
          {/* Main nav links */}
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative px-2 sm:px-3 py-2 text-sm font-medium transition-colors duration-200 group ${isActive(href)
                ? 'text-indigo-400'
                : 'text-gray-400 hover:text-indigo-400'
                }`}
            >
              {label}
              <span
                className={`absolute -bottom-0.5 left-2 right-2 h-0.5 bg-indigo-500 transition-all duration-300 ${isActive(href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
              />
            </Link>
          ))}

          {/* Dashboard link (if authenticated and enabled) */}
          {isAuthenticated && showDashboardLink && (
            <Link
              href="/dashboard"
              className={`relative px-2 sm:px-3 py-2 text-sm font-medium transition-colors duration-200 group ${isActive('/dashboard')
                ? 'text-indigo-400'
                : 'text-gray-400 hover:text-indigo-400'
                }`}
            >
              Dashboard
              <span
                className={`absolute -bottom-0.5 left-2 right-2 h-0.5 bg-indigo-500 transition-all duration-300 ${isActive('/dashboard') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
              />
            </Link>
          )}


          {/* Auth buttons - Logout moved to Footer */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 ml-2">
              {/* AI Chat Button */}
              <button
                onClick={toggleDrawer}
                className="p-2 rounded-lg text-indigo-400 hover:text-white hover:bg-indigo-500/20 transition-all border border-indigo-500/30 flex items-center justify-center gap-2"
                aria-label="Open AI Chat"
              >
                <span className="text-xl">🤖</span>
                <span className="hidden lg:inline text-xs font-semibold">AI Assistant</span>
              </button>

              {/* User indicator - logout is in footer */}
              <span className="hidden md:inline text-xs text-gray-400 px-2 py-1 bg-indigo-500/10 rounded-md border border-indigo-500/20">
                {user?.name || user?.email?.split('@')[0]}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link
                href="/login"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive('/login')
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors duration-200 shadow-lg shadow-indigo-500/20"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
