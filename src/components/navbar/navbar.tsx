'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Menu, X, CheckSquare, User, LogOut, Plus } from 'lucide-react';
import LogoutButton from '@/components/auth/logoutButton';
import useRootStore from '@/store';
import CreateTodoForm from '../todo/createTodoForm';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const { openModal } = useRootStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TodoApp</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {session && (
                <>
                  <Link
                    href="/home"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Home
                  </Link>
                  <button
                    onClick={() => openModal(<CreateTodoForm />, "Create Todo")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Todo</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              {status === 'loading' ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ) : session ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {session.user?.name || session.user?.email}
                      </span>
                    </div>
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/signin"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t">
            {session ? (
              <>
                <Link
                  href="/home"
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <button
                  onClick={() => openModal(<CreateTodoForm />, "Create Todo")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Todo</span>
                </button>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center px-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-base font-medium text-gray-800">
                        {session.user?.name || session.user?.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-3">
                    <LogoutButton />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="space-y-2 px-3">
                    <Link
                      href="/signin"
                      className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md text-sm font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
