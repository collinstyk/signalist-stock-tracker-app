import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { getWatchlistSymbolsByEmail } from "./actions/watchlist.actions";
import { fetchNews } from "./actions/news.actions";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "your_connection_string", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Routes
app.get("/watchlist/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const symbols = await getWatchlistSymbolsByEmail(email);
    res.json(symbols);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch watchlist symbols" });
  }
});

app.get("/news/:symbols", async (req, res) => {
  const { symbols } = req.params;
  try {
    const news = await fetchNews(symbols.split(","));
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Start the server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();