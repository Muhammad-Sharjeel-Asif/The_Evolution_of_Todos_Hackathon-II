'use client';

import { useAuth } from '@/lib/context/AuthContext';
import { motion } from 'framer-motion';

export default function Footer() {
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <footer className="w-full border-t border-indigo-500/10 bg-card/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Copyright / Brand */}
        <div className="text-xs text-gray-text">
          <span className="hidden sm:inline">© 2026 Taskify. </span>
          <span>Built with ⚡</span>
        </div>

        {/* Authenticated user section with logout */}
        {isAuthenticated && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-text">
              {user?.name || user?.email?.split('@')[0]}
            </span>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-1.5 text-xs rounded-lg bg-indigo-500/10 text-indigo-400
                hover:bg-indigo-500/20 hover:text-indigo-300 transition-all duration-200
                border border-indigo-500/20 hover:border-indigo-500/30 font-medium"
            >
              Logout
            </motion.button>
          </div>
        )}
      </div>
    </footer>
  );
}