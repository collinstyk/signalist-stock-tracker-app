import { Inngest } from "inngest";
import { getWatchlistSymbolsByEmail } from "../../actions/watchlist.actions";
import { fetchNewsBySymbols } from "../../actions/news.actions";
import { sendEmail } from "../../utils/email.utils"; // Assuming there's a utility for sending emails
import { User } from "../../types"; // Assuming User type is defined in types/index.ts

const inngest = new Inngest({ region: "us" });

export const sendDailyNewsSummary = inngest.createFunction(
  "Send Daily News Summary",
  { cron: "0 9 * * *" }, // Runs every day at 9 AM
  async ({ event }) => {
    try {
      const users: User[] = await getAllUsers(); // Function to retrieve all users
      for (const user of users) {
        const symbols = await getWatchlistSymbolsByEmail(user.email);
        if (symbols.length > 0) {
          const newsArticles = await fetchNewsBySymbols(symbols);
          const summary = summarizeNews(newsArticles); // Function to summarize news articles
          await sendEmail(user.email, "Daily News Summary", summary);
        }
      }
    } catch (error) {
      console.error("Error sending daily news summary:", error);
    }
  }
);

// Helper function to summarize news articles
function summarizeNews(articles: any[]): string {
  return articles.map(article => `${article.title}: ${article.link}`).join("\n");
}

// Placeholder function to get all users
async function getAllUsers(): Promise<User[]> {
  // Implementation to fetch all users from the database
  return [];
}