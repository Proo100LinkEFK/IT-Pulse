
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const COMMON_DOMAINS = ['mail.ru', 'gmail.com', 'yandex.ru', 'outlook.com', 'bk.ru', 'list.ru'];

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (email.includes('@')) {
      const parts = email.split('@');
      if (parts.length === 2 && parts[1] === '') {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  }, [email]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: 'u1',
      name: email.split('@')[0] || 'Пользователь',
      email: email,
      avatar: 'https://picsum.photos/seed/user/100/100'
    });
  };

  const handleSuggestionClick = (domain: string) => {
    const prefix = email.split('@')[0];
    setEmail(`${prefix}@${domain}`);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in duration-300 border border-transparent dark:border-gray-800">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-300 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-2xl shadow-indigo-200 dark:shadow-none">P</div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">С возвращением!</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 font-medium px-4">Пульс IT-мира ждет вашего участия и обсуждений.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email</label>
            <input 
              ref={inputRef}
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent rounded-2xl px-6 py-4 text-lg font-bold focus:bg-white dark:focus:bg-gray-700 focus:border-indigo-500 outline-none transition-all shadow-sm dark:text-white dark:placeholder:text-gray-600"
              placeholder="vladimir"
            />
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-2 z-10 animate-in slide-in-from-top-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 p-2 border-b border-gray-50 dark:border-gray-700 mb-1">Выберите домен</p>
                <div className="grid grid-cols-2 gap-1">
                  {COMMON_DOMAINS.map(domain => (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => handleSuggestionClick(domain)}
                      className="text-left px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-colors"
                    >
                      @{domain}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Пароль</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent rounded-2xl px-6 py-4 text-lg font-bold focus:bg-white dark:focus:bg-gray-700 focus:border-indigo-500 outline-none transition-all shadow-sm dark:text-white dark:placeholder:text-gray-600"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none active:scale-95"
          >
            Войти в систему
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-gray-100 dark:border-gray-800 text-center text-sm font-medium text-gray-400 dark:text-gray-500">
          Нет аккаунта? <button className="text-indigo-600 dark:text-indigo-400 font-black hover:underline ml-1">Создать профиль</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
