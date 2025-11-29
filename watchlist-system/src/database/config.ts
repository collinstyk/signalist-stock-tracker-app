import mongoose from "mongoose";

const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/watchlist";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, options);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};