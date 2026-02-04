/**
 * Dashboard Page - Black & Yellow Theme
 * Enhanced with lightweight animations and premium feel
 * Phase 2: Database-backed for authenticated users, in-memory for guests
 * Phase 3: Integrated with AI Chatbot via shared Navbar
 */

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import TaskList from '@/components/task/TaskList';
import TaskListErrorBoundary from '@/components/task/TaskListErrorBoundary';
import TaskForm from '@/components/task/TaskForm';
import DeleteModal from '@/components/task/DeleteModal';
import FilterTabs from '@/components/task/FilterTabs';
import { useToast } from '@/components/ui/Toast';
import { useTaskContext } from '@/lib/context/TaskContext';
import { useAuth } from '@/lib/context/AuthContext';
import useTasks from '@/lib/hooks/useTasks';
import { Navbar } from '@/components/layout';
import type { Task } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const { tasks, isLoading, isError, error, mutate } = useTasks({ filter });
  const [isNewUser, setIsNewUser] = useState(false);

  // Modal state management
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();
  const { deleteTask } = useTaskContext();

  // Task refresh callback for chat integration
  // const _handleTasksChanged = useCallback(() => {
  //   mutate();
  // }, [mutate]);

  // Check if user is new (just signed up)
  React.useEffect(() => {
    const newUserFlag = localStorage.getItem('isNewUser');
    if (newUserFlag === 'true') {
      setIsNewUser(true);
      // Clear the flag after showing the welcome message
      setTimeout(() => {
        localStorage.removeItem('isNewUser');
        setIsNewUser(false);
      }, 5000); // Clear after 5 seconds
    }
  }, []);

  // Calculate task analytics
  const analytics = useMemo(() => {
    const allTasks = tasks;
    return {
      total: allTasks.length,
      completed: allTasks.filter(t => t.status === 'completed').length,
      active: allTasks.filter(t => t.status === 'pending').length,
    };
  }, [tasks]);

  const handleLogout = () => {
    router.push('/');
  };

  const handleComplete = (_taskId: string) => {
    mutate();
  };

  const handleEdit = (_taskId: string) => {
    mutate();
  };

  const handleDelete = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setTaskToDelete(task);
      setDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;

    setIsDeleting(true);

    try {
      await deleteTask(taskToDelete.id);
      mutate();
      showToast('success', 'Task deleted successfully');
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      showToast(
        'error',
        error instanceof Error ? error.message : 'Failed to delete task'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleRetry = () => {
    mutate();
  };

  const handleTaskCreated = () => {
    mutate();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background Glow Blobs for premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

      {/* Shared Navbar with AI Chat button */}
      <Navbar onLogout={handleLogout} showDashboardLink={false} />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
              {isAuthenticated ? (
                isNewUser ? (
                  <>Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">{user?.name || user?.email?.split('@')[0] || 'User'}</span>!</>
                ) : (
                  <>Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">{user?.name || user?.email?.split('@')[0] || 'User'}</span>!</>
                )
              ) : (
                <>Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Guest</span>!</>
              )}
            </h1>
            <p className="text-gray-text text-lg max-w-2xl leading-relaxed">
              {isAuthenticated ? (
                <>Your tasks are <span className="text-indigo-400/90 font-medium">securely encrypted</span>. Stay productive and focused.</>
              ) : (
                <>You're in guest mode. <span className="text-indigo-400/90 font-medium font-semibold hover:text-indigo-300 transition-colors pointer-events-auto cursor-pointer" onClick={() => router.push('/login')}>Login</span> to unlock full cloud sync.</>
              )}
            </p>
          </motion.div>

          {/* Task Analytics - Premium Indigo Cards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10"
          >
            {/* Total Tasks */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-card/40 backdrop-blur-sm border border-indigo-500/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 shadow-xl hover:shadow-indigo-500/5 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-text text-xs font-bold uppercase tracking-widest mb-2">Total Tasks</p>
                  <motion.p
                    key={analytics.total}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-white text-4xl font-extrabold tracking-tight"
                  >
                    {analytics.total}
                  </motion.p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Active Tasks */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-card/40 backdrop-blur-sm border border-indigo-500/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 shadow-xl hover:shadow-indigo-500/5 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-text text-xs font-bold uppercase tracking-widest mb-2">Active</p>
                  <motion.p
                    key={analytics.active}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-white text-4xl font-extrabold tracking-tight"
                  >
                    {analytics.active}
                  </motion.p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Completed Tasks */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-card/40 backdrop-blur-sm border border-indigo-500/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 shadow-xl hover:shadow-indigo-500/5 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-text text-xs font-bold uppercase tracking-widest mb-2">Completed</p>
                  <motion.p
                    key={analytics.completed}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-white text-4xl font-extrabold tracking-tight"
                  >
                    {analytics.completed}
                  </motion.p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Task Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <TaskForm onTaskCreated={handleTaskCreated} />
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <FilterTabs
              currentFilter={filter}
              onFilterChange={setFilter}
            />
          </motion.div>

          {/* Task List */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <TaskListErrorBoundary>
              <TaskList
                tasks={tasks}
                isLoading={isLoading}
                error={isError ? error : null}
                onComplete={handleComplete}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRetry={handleRetry}
              />
            </TaskListErrorBoundary>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-indigo-500/10 py-6 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-text text-sm">
            © 2026 <span className="text-indigo-400">Taskify</span>. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        taskTitle={taskToDelete?.title || ''}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
