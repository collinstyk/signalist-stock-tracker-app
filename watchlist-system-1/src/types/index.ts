export interface WatchlistItem {
  userId: string;
  symbol: string;
  company: string;
  addedAt: Date;
}

export interface User {
  email: string;
  watchlist: WatchlistItem[];
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
}

export interface DailyNewsSummary {
  userId: string;
  articles: NewsArticle[];
}