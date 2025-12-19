
import React from 'react';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
  onClick: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  return (
    <article 
      onClick={onClick}
      className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-indigo-100 dark:hover:border-indigo-900 hover:shadow-xl hover:shadow-indigo-50/50 dark:hover:shadow-none transition-all cursor-pointer flex flex-col group"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 shadow-sm">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <img src={article.author.avatar} alt={article.author.name} className="w-5 h-5 rounded-full" />
          <span className="text-xs text-gray-500 dark:text-gray-400">{article.author.name}</span>
          <span className="text-[10px] text-gray-300 dark:text-gray-700">•</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{article.date}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
          {article.summary}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800 mt-auto">
          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {article.views}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {article.readTime}
            </span>
          </div>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center gap-1">
            Подробнее 
            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
