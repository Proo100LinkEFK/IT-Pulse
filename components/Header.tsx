
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onCreateClick: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onLogout, onCreateClick, searchQuery, setSearchQuery, isDarkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.href = '/'}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 group-hover:scale-105 transition-transform">
            P
          </div>
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hidden sm:block">
            IT Pulse
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-grow max-w-xl hidden md:block">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Поиск новостей, технологий, гайдов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Theme Toggle & Auth */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            title={isDarkMode ? 'Светлая тема' : 'Темная тема'}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
          </button>

          <button 
            onClick={onCreateClick}
            className="hidden sm:flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 px-4 py-2 rounded-full font-bold transition-all text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Создать пост
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{user.name}</p>
                <button onClick={onLogout} className="text-xs text-red-500 hover:text-red-600 transition-colors">Выйти</button>
              </div>
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full border-2 border-indigo-100 dark:border-indigo-900 shadow-sm"
              />
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-indigo-100 dark:shadow-none"
            >
              Войти
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
