
import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';

interface ArticleViewProps {
  article: NewsArticle;
  onBack: () => void;
  onSubscribe: (authorId: string) => void;
  onAddComment: (articleId: string, text: string) => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack, onSubscribe, onAddComment }) => {
  const [commentText, setCommentText] = useState('');
  const [showToc, setShowToc] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.id]);

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Назад к ленте
      </button>

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <img 
            src={article.author.avatar} 
            alt={article.author.name} 
            className="w-14 h-14 rounded-full border-2 border-gray-100 dark:border-gray-800" 
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white leading-none">{article.author.name}</h4>
              <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{(article.author.subscribers / 1000).toFixed(1)} тыс подписчиков</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSubscribe(article.author.id)}
            className={`px-8 py-2.5 rounded-lg font-bold transition-all shadow-sm ${
              article.author.isSubscribed 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {article.author.isSubscribed ? 'Вы подписаны' : 'Подписаться'}
          </button>
          <button className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-8">
        {article.title}
      </h1>

      <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <span>{article.date}</span>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {article.views}
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {article.readTime}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 mb-10 border border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between cursor-pointer" onClick={() => setShowToc(!showToc)}>
          Оглавление
          <svg className={`w-5 h-5 transform transition-transform ${showToc ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </h3>
        {showToc && (
          <ul className="space-y-3">
            {article.toc.map((item, i) => (
              <li key={i} className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer text-sm font-medium transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-300 dark:bg-indigo-700 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 leading-relaxed mb-16 whitespace-pre-wrap font-inter">
        {article.content}
      </div>

      <section id="discussion" className="border-t border-gray-100 dark:border-gray-800 pt-16">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          Обсуждение
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm px-3 py-1 rounded-full">{article.comments.length}</span>
        </h3>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 mb-12 border border-gray-100 dark:border-gray-800">
          <textarea
            placeholder="Что вы думаете об этом?"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-indigo-500 outline-none transition-all mb-4 dark:text-white dark:placeholder:text-gray-600"
          />
          <div className="flex justify-end">
            <button 
              onClick={() => {
                if (commentText.trim()) {
                  onAddComment(article.id, commentText);
                  setCommentText('');
                }
              }}
              className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 dark:shadow-none"
            >
              Опубликовать
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {article.comments.map(comment => (
            <div key={comment.id} className="flex gap-4">
              <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full flex-shrink-0" />
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900 dark:text-white">{comment.author}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{comment.text}</p>
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 dark:text-gray-500">
                  <button className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 10h4.708a2 2 0 011.953 2.438l-.7 2.8A2 2 0 0118.008 17H11V7l2.828-2.828a1 1 0 011.414 0L15 4.414l-1 5.586H14z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {comment.likes}
                  </button>
                  <button className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wider">Ответить</button>
                </div>
              </div>
            </div>
          ))}
          {article.comments.length === 0 && (
            <div className="text-center py-10 text-gray-400 dark:text-gray-600 italic">
              Здесь пока пусто. Будьте первым, кто оставит комментарий!
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticleView;
