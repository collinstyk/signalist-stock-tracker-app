import axios from "axios";
import { NewsArticle } from "../types/index"; // Adjust the import path as necessary

export async function fetchNewsBySymbols(symbols: string[]): Promise<NewsArticle[]> {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: symbols.join(","),
        apiKey: process.env.NEWS_API_KEY, // Ensure you have your API key in environment variables
      },
    });
    return response.data.articles;
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