import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

export default function Layout() {
  const { userData, logout } = useAuthStore();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="min-h-screen">
        <nav className={`${
          isDarkMode 
            ? 'bg-gray-800/50 backdrop-blur-md border-gray-700' 
            : 'bg-white border-gray-200'
        } border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Logo />
              </div>
              
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <span className={`${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{userData?.username}</span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}