"use server";
import axios from "axios";
import { WatchlistItem } from "../database/models/watchlist.model"; // Adjust the import path as necessary
import { NewsArticle } from "../types/index"; // Adjust the import path as necessary

export async function fetchNewsBySymbols(
  symbols: string[],
): Promise<NewsArticle[]> {
  try {
    if (!process.env.NEWS_API_KEY) {
      console.error("NEWS_API_KEY is not set");
      return [];
    }
    if (!symbols.length) {
      return [];
    }
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: symbols.join(","),
        apiKey: process.env.NEWS_API_KEY, // Ensure you have your API key in environment variables
      },
    });

    const articles = response.data?.articles;
    if (!Array.isArray(articles)) {
      console.error("Unexpected API response structure");
      return [];
    }
    return articles.map((article) => ({
      ...article,
      publishedAt: new Date(article.publishedAt),
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export async function fetchGeneralMarketNews(): Promise<NewsArticle[]> {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        category: "business",
        apiKey: process.env.NEWS_API_KEY, // Ensure you have your API key in environment variables
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching general market news:", error);
    return [];
  }
}
