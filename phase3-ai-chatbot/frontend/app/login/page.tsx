/**
 * Login Page
 * Professional authentication page using Better Auth
 * Clean, centered layout with smooth animations
 * Phase 3: Integrated with shared Navbar
 *
 * T186-T191: Authentication Error Handling (US8)
 * - Inline error messages instead of browser alerts
 * - Field-level validation errors
 * - Error clears when user starts typing
 */

'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { Navbar } from '@/components/layout';
import { LoginErrorMessage, FieldError } from './components/LoginErrorMessage';

// T187: Email validation regex (basic format check)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// T186: Error state types
interface ValidationErrors {
  email: string | null;
  password: string | null;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // T186: Error state management
  const [apiError, setApiError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    email: null,
    password: null,
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  };

  // T187: Client-side form validation
  const validateForm = useCallback((): boolean => {
    const errors: ValidationErrors = {
      email: null,
      password: null,
    };
    let isValid = true;

    // Email required check
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!EMAIL_REGEX.test(formData.email)) {
      // Email format validation
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password required check
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  }, [formData.email, formData.password]);

  // T188: Updated handleSubmit with inline error display
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous API error
    setApiError(null);

    // T187: Validate form before API call
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push('/dashboard');
    } catch (error: unknown) {
      // T188: Display inline error instead of alert
      if (error instanceof Error) {
        // Check if it's a network error
        if (
          error.message.includes('fetch') ||
          error.message.includes('network') ||
          error.message.includes('Network') ||
          error.message.includes('Failed to fetch') ||
          error.message.includes('Unable to connect')
        ) {
          setApiError('Unable to connect. Please check your internet connection and try again.');
        } else if (
          error.message.includes('401') ||
          error.message.includes('Invalid') ||
          error.message.includes('Unauthorized') ||
          error.message.toLowerCase().includes('password') ||
          error.message.toLowerCase().includes('credentials')
        ) {
          // 401 Unauthorized - Invalid credentials
          setApiError('Invalid email or password');
        } else {
          // Generic error - show invalid credentials for security
          setApiError('Invalid email or password');
        }
      } else {
        setApiError('Invalid email or password');
      }
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // T189: Clear error messages when user starts typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // T189: Clear API error when user starts typing
    if (apiError) {
      setApiError(null);
    }

    // Clear field-level validation error when user starts typing in that field
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors({
        ...validationErrors,
        [name]: null,
      });
    }
  };

  const handleFocus = (field: string) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field: string) => {
    setIsFocused({ ...isFocused, [field]: false });

    // T187: Validate email format on blur
    if (field === 'email' && formData.email.trim() && !EMAIL_REGEX.test(formData.email)) {
      setValidationErrors({
        ...validationErrors,
        email: 'Please enter a valid email address',
      });
    }
  };

  // T191: Helper function for input border styling with error state
  const getInputClassName = (field: 'email' | 'password') => {
    const hasError = validationErrors[field];
    const focused = isFocused[field];

    if (hasError) {
      // Error state - red border
      return 'w-full px-4 py-3 bg-card/50 border-2 border-red-500/50 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300';
    }

    if (focused) {
      // Focused state - indigo glow
      return 'w-full px-4 py-3 bg-card border border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-500/10 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300';
    }

    // Default state
    return 'w-full px-4 py-3 bg-card/50 border border-indigo-500/10 hover:border-indigo-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background Glow Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

      {/* Shared Navbar */}
      <Navbar />

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="w-full max-w-md"
        >
          {/* Title */}
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Back</span>
            </h1>
            <p className="text-lg text-gray-text">
              Sign in to continue to Taskify
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            variants={fadeInUp}
            className="bg-card/40 backdrop-blur-md border border-indigo-500/10 rounded-2xl p-8 shadow-2xl shadow-indigo-500/5 relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                  aria-invalid={!!validationErrors.email}
                  aria-describedby={validationErrors.email ? 'email-error' : undefined}
                  className={getInputClassName('email')}
                  placeholder="your.email@example.com"
                />
                {/* T190: Field-level validation error */}
                <div id="email-error">
                  <FieldError message={validationErrors.email} />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  aria-invalid={!!validationErrors.password}
                  aria-describedby={validationErrors.password ? 'password-error' : undefined}
                  className={getInputClassName('password')}
                  placeholder="••••••••"
                />
                {/* T190: Field-level validation error */}
                <div id="password-error">
                  <FieldError message={validationErrors.password} />
                </div>
              </div>

              {/* T186: API Error Message - displayed below form inputs */}
              <LoginErrorMessage message={apiError} />

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-gray-text hover:text-indigo-400 transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </form>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div variants={fadeInUp} className="mt-6 text-center">
            <p className="text-sm text-gray-text">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 font-medium"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-indigo-500/10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-text text-sm">
            © 2026 Taskify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
