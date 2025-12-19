
export interface Author {
  id: string;
  name: string;
  avatar: string;
  subscribers: number;
  isSubscribed: boolean;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

export type ContentBlockType = 'h2' | 'p' | 'image';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  value: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown-like string compiled from blocks
  category: string;
  author: Author;
  date: string;
  views: number;
  readTime: string;
  image: string;
  tags: string[];
  toc: string[];
  comments: Comment[];
  isUserGenerated?: boolean;
  blocks?: ContentBlock[]; // Original blocks for editing
}

export type Category = 'All' | 'AI' | 'Dev' | 'Hardware' | 'Security' | 'Cloud';
export type SortBy = 'newest' | 'popular' | 'trending';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
