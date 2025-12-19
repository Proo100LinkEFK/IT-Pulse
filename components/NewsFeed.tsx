
import React from 'react';
import { NewsArticle } from '../types';
import NewsCard from './NewsCard';

interface NewsFeedProps {
  articles: NewsArticle[];
  onArticleClick: (article: NewsArticle) => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ articles, onArticleClick }) => {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 4v5h5" />
        </svg>
        <p className="text-xl font-medium">Ничего не найдено</p>
        <p className="text-sm">Попробуйте изменить параметры фильтрации или поиска</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map(article => (
        <NewsCard 
          key={article.id} 
          article={article} 
          onClick={() => onArticleClick(article)} 
        />
      ))}
    </div>
  );
};

export default NewsFeed;
