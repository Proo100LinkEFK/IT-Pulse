
import React, { useState } from 'react';
import { Category, User, NewsArticle, ContentBlock, ContentBlockType } from '../types';
import { CATEGORIES } from '../constants';
import { improveArticleContent } from '../services/geminiService';

interface CreateNewsFormProps {
  user: User;
  onPublish: (article: NewsArticle) => void;
  onCancel: () => void;
}

const CreateNewsForm: React.FC<CreateNewsFormProps> = ({ user, onPublish, onCancel }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState<Category>('Dev');
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    { id: '1', type: 'p', value: '' }
  ]);
  const [isImproving, setIsImproving] = useState(false);

  const addBlock = (type: ContentBlockType) => {
    const newBlock: ContentBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      value: type === 'image' ? 'https://picsum.photos/seed/' + Math.random() + '/800/400' : ''
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, value: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, value } : b));
  };

  const removeBlock = (id: string) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter(b => b.id !== id));
    }
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newBlocks.length) {
      [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  const handleImproveWithAI = async () => {
    const fullContent = blocks.map(b => b.value).join('\n\n');
    if (!title || !fullContent) {
      alert('Пожалуйста, заполните заголовок и хотя бы один блок текста для улучшения');
      return;
    }
    
    setIsImproving(true);
    try {
      const improved = await improveArticleContent(title, fullContent);
      setTitle(improved.improvedTitle);
      setSummary(improved.suggestedSummary);
      setBlocks([{ id: 'ai-1', type: 'p', value: improved.improvedContent }]);
    } catch (error) {
      alert('Не удалось улучшить текст. Проверьте API ключ.');
    } finally {
      setIsImproving(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullContent = blocks.map(b => {
      if (b.type === 'h2') return `## ${b.value}`;
      if (b.type === 'image') return `![Image](${b.value})`;
      return b.value;
    }).join('\n\n');

    if (!title || !fullContent || !summary) {
      alert('Заполните все обязательные поля (заголовок, описание и содержание)');
      return;
    }

    const firstImage = blocks.find(b => b.type === 'image')?.value || `https://picsum.photos/seed/${Date.now()}/800/400`;

    const newArticle: NewsArticle = {
      id: Date.now().toString(),
      title,
      summary,
      content: fullContent,
      category,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        subscribers: 0,
        isSubscribed: false
      },
      date: 'Сегодня',
      views: 0,
      readTime: `${Math.ceil(fullContent.length / 800)} мин`,
      image: firstImage,
      tags: [],
      toc: blocks.filter(b => b.type === 'h2').map(b => b.value),
      comments: [],
      isUserGenerated: true,
      blocks
    };

    onPublish(newArticle);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-10 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Новая публикация</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Создайте качественный контент для сообщества IT Pulse</p>
        </div>
        <button 
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Заголовок статьи</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 text-xl font-bold focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 dark:text-white"
              placeholder="Как технологии меняют мир..."
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Категория</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 text-lg font-bold focus:border-indigo-500 outline-none transition-all cursor-pointer appearance-none dark:text-white"
            >
              {CATEGORIES.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Краткое описание (для ленты)</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-3 text-gray-600 dark:text-gray-300 focus:border-indigo-500 outline-none transition-all resize-none dark:placeholder:text-gray-600"
            placeholder="Опишите в паре предложений суть вашей статьи..."
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400">Содержание статьи</label>
            <button
              type="button"
              onClick={handleImproveWithAI}
              disabled={isImproving || !title || blocks[0].value.length < 10}
              className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-full transition-all ${
                isImproving 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 dark:shadow-none active:scale-95 disabled:opacity-30'
              }`}
            >
              {isImproving ? (
                <><div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></div> Магия...</>
              ) : (
                <><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zM11 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1zM4 12a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM11 12a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"/></svg> AI Улучшение</>
              )}
            </button>
          </div>

          <div className="space-y-6">
            {blocks.map((block, index) => (
              <div key={block.id} className="group relative bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 hover:bg-white dark:hover:bg-gray-800 transition-all">
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button type="button" onClick={() => moveBlock(index, 'up')} className="p-1.5 bg-white dark:bg-gray-700 shadow-sm rounded-md hover:text-indigo-600 dark:text-gray-300 disabled:opacity-30" disabled={index === 0}>
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7" strokeWidth="2"/></svg>
                   </button>
                   <button type="button" onClick={() => moveBlock(index, 'down')} className="p-1.5 bg-white dark:bg-gray-700 shadow-sm rounded-md hover:text-indigo-600 dark:text-gray-300 disabled:opacity-30" disabled={index === blocks.length - 1}>
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2"/></svg>
                   </button>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-grow">
                    {block.type === 'h2' && (
                      <input
                        type="text"
                        value={block.value}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        className="w-full bg-transparent text-2xl font-bold outline-none border-b-2 border-dashed border-gray-200 dark:border-gray-700 focus:border-indigo-300 pb-1 dark:text-white"
                        placeholder="Подзаголовок секции..."
                      />
                    )}
                    {block.type === 'p' && (
                      <textarea
                        value={block.value}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        rows={3}
                        className="w-full bg-transparent text-lg text-gray-700 dark:text-gray-300 outline-none resize-none font-inter dark:placeholder:text-gray-600"
                        placeholder="Начните писать текст..."
                      />
                    )}
                    {block.type === 'image' && (
                      <div className="space-y-3">
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                          {block.value ? (
                            <img src={block.value} className="w-full h-full object-cover" alt="Preview" />
                          ) : (
                            <span className="text-gray-400 dark:text-gray-600">Нет изображения</span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={block.value}
                          onChange={(e) => updateBlock(block.id, e.target.value)}
                          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 dark:text-gray-300"
                          placeholder="URL изображения..."
                        />
                      </div>
                    )}
                  </div>
                  <button type="button" onClick={() => removeBlock(block.id)} className="p-2 text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 py-8 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl mt-6 bg-gray-50/30 dark:bg-gray-900/30">
            <button type="button" onClick={() => addBlock('p')} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-gray-600 dark:text-gray-400 hover:border-indigo-300 dark:hover:border-indigo-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7" strokeWidth="2"/></svg> Текст
            </button>
            <button type="button" onClick={() => addBlock('h2')} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-gray-600 dark:text-gray-400 hover:border-indigo-300 dark:hover:border-indigo-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 8h10M12 4v16M5 20h14" strokeWidth="2"/></svg> Заголовок
            </button>
            <button type="button" onClick={() => addBlock('image')} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-gray-600 dark:text-gray-400 hover:border-indigo-300 dark:hover:border-indigo-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2"/></svg> Фото
            </button>
          </div>
        </div>

        <div className="flex gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
          <button type="button" onClick={onCancel} className="flex-1 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">Отмена</button>
          <button type="submit" className="flex-[2] px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-3">Опубликовать в Pulse <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="3"/></svg></button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewsForm;
