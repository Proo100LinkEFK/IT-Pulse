
import React, { useState, useMemo, useEffect } from 'react';
import { NewsArticle, Category, SortBy, User } from './types';
import { MOCK_NEWS, CATEGORIES } from './constants';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import ArticleView from './components/ArticleView';
import AuthModal from './components/AuthModal';
import CreateNewsForm from './components/CreateNewsForm';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>(MOCK_NEWS);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const filteredNews = useMemo(() => {
    let result = news.filter(item => {
      const matchesCategory = currentCategory === 'All' || item.category === currentCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'popular') {
      result.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'trending') {
      result.sort((a, b) => (b.views / 2) - (a.views / 2));
    } else {
      result.sort((a, b) => {
        if (a.isUserGenerated && !b.isUserGenerated) return -1;
        if (!a.isUserGenerated && b.isUserGenerated) return 1;
        return Number(b.id) - Number(a.id);
      });
    }

    return result;
  }, [news, currentCategory, searchQuery, sortBy]);

  const handleSubscribe = (authorId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setNews(prev => prev.map(article => {
      if (article.author.id === authorId) {
        return {
          ...article,
          author: {
            ...article.author,
            isSubscribed: !article.author.isSubscribed,
            subscribers: article.author.isSubscribed ? article.author.subscribers - 1 : article.author.subscribers + 1
          }
        };
      }
      return article;
    }));
  };

  const handleAddComment = (articleId: string, text: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      author: currentUser.name,
      avatar: currentUser.avatar,
      text,
      timestamp: 'Только что',
      likes: 0
    };
    setNews(prev => prev.map(article => 
      article.id === articleId ? { ...article, comments: [newComment, ...article.comments] } : article
    ));
  };

  const handlePublishNews = (newArticle: NewsArticle) => {
    setNews(prev => [newArticle, ...prev]);
    setIsCreating(false);
    setSelectedArticle(newArticle);
  };

  const handleCreateClick = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
    } else {
      setIsCreating(true);
      setSelectedArticle(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Header 
        user={currentUser} 
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={() => setCurrentUser(null)}
        onCreateClick={handleCreateClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {isCreating && currentUser ? (
          <CreateNewsForm 
            user={currentUser} 
            onPublish={handlePublishNews}
            onCancel={() => setIsCreating(false)} 
          />
        ) : selectedArticle ? (
          <ArticleView 
            article={selectedArticle} 
            onBack={() => setSelectedArticle(null)}
            onSubscribe={handleSubscribe}
            onAddComment={handleAddComment}
          />
        ) : (
          <div className="flex flex-col gap-6">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCurrentCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      currentCategory === cat 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">Сортировать:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer border-b border-gray-200 dark:border-gray-700 py-1 dark:text-gray-200"
                >
                  <option value="newest">Новые</option>
                  <option value="popular">Популярные</option>
                  <option value="trending">В тренде</option>
                </select>
              </div>
            </div>

            <NewsFeed 
              articles={filteredNews} 
              onArticleClick={setSelectedArticle}
            />
          </div>
        )}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={(user) => {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
        }}
      />

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-8 mt-12 transition-colors">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="text-xl font-bold tracking-tight dark:text-white">IT Pulse</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">© 2024 IT Pulse. Все права защищены. Будьте в курсе будущего.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
