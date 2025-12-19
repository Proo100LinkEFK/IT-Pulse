
import { NewsArticle, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'AI', 'Dev', 'Hardware', 'Security', 'Cloud'];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'Память телефона забита непонятно чем? Есть способ освободить 20 гигабайт за 10 минут',
    summary: 'Узнайте, как очистить хранилище вашего смартфона от скрытого мусора и кэша мессенджеров без удаления важных фотографий.',
    content: `Вы когда-нибудь пытались сделать фото, а телефон выдавал холодное «Недостаточно места»? В этот момент хочется швырнуть смартфон об стену. Особенно когда понимаешь: ни одной фотографии удалять не хочется. Каждая дорога. Каждая связана с воспоминанием.

Но вот парадокс: проблема обычно вообще не в фотографиях. Виноваты совсем другие вещи, о которых мы часто забываем. 

В этой статье мы разберем основные "пожиратели" памяти и покажем пошаговый план очистки. Мы не будем трогать вашу галерею, мы будем воевать с системным мусором и раздутыми базами данных приложений.`,
    category: 'Hardware',
    author: {
      id: 'a1',
      name: 'Pochinka_blog',
      avatar: 'https://picsum.photos/seed/p1/200/200',
      subscribers: 82200,
      isSubscribed: false
    },
    date: 'Сегодня',
    views: 412,
    readTime: '5 мин',
    image: 'https://picsum.photos/seed/tech1/800/400',
    tags: ['Смартфоны', 'Оптимизация', 'Советы'],
    toc: [
      'Telegram съел половину вашего телефона',
      'Приложения-призраки живут среди нас',
      'Загрузки — это цифровая свалка'
    ],
    comments: [
      {
        id: 'c1',
        author: 'TechGuru',
        avatar: 'https://picsum.photos/seed/u1/100/100',
        text: 'Телеграм реально жесть сколько кэша копит. Раз в неделю чищу стабильно.',
        timestamp: '2 часа назад',
        likes: 12
      }
    ]
  },
  {
    id: '2',
    title: 'Gemini 2.0: Революция в понимании контекста или просто маркетинг?',
    summary: 'Разбираем новые возможности мультимодальной модели от Google и тестируем её в реальных задачах кодинга.',
    content: 'Google представила новую версию своей ИИ-модели Gemini. Основной упор сделан на "бесконечное" контекстное окно и нативную поддержку аудио и видео в реальном времени...',
    category: 'AI',
    author: {
      id: 'a2',
      name: 'AI Insider',
      avatar: 'https://picsum.photos/seed/p2/200/200',
      subscribers: 15400,
      isSubscribed: true
    },
    date: 'Вчера',
    views: 12050,
    readTime: '12 мин',
    image: 'https://picsum.photos/seed/ai2/800/400',
    tags: ['Google', 'AI', 'Gemini'],
    toc: ['Архитектура', 'Тесты производительности', 'Сравнение с GPT-5'],
    comments: []
  },
  {
    id: '3',
    title: 'Почему Rust становится стандартом для системного программирования',
    summary: 'Исследуем причины популярности языка Rust и почему крупные компании переписывают свои ядра на него.',
    content: 'Безопасность памяти без сборщика мусора — это святой грааль программирования. Rust доказал, что это возможно...',
    category: 'Dev',
    author: {
      id: 'a3',
      name: 'Code Master',
      avatar: 'https://picsum.photos/seed/p3/200/200',
      subscribers: 45000,
      isSubscribed: false
    },
    date: '2 дня назад',
    views: 8900,
    readTime: '15 мин',
    image: 'https://picsum.photos/seed/rust3/800/400',
    tags: ['Rust', 'Backend', 'Systems'],
    toc: ['Borrow Checker', 'Zero-cost abstractions', 'Экосистема'],
    comments: []
  }
];
