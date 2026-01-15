'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import ThemeToggle from '../theme-toggle';

const Navbar: React.FC = () => {
  const { state, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-indigo-600 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/dashboard" className="text-white dark:text-white text-xl font-bold">
                Todo App
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/dashboard"
                  className="text-white dark:text-gray-300 hover:bg-indigo-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/tasks"
                  className="text-white dark:text-gray-300 hover:bg-indigo-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Tasks
                </Link>
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center md:ml-6 space-x-4">
            <ThemeToggle />
            {/* User profile dropdown */}
            <div className="ml-3 relative">
              <div className="flex items-center space-x-3">
                {state.user?.name && (
                  <span className="text-white dark:text-gray-300 hidden md:inline-block">
                    Welcome, {state.user.name}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-indigo-700 dark:bg-indigo-600 text-white dark:text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-800 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 dark:ring-offset-gray-800 focus:ring-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;