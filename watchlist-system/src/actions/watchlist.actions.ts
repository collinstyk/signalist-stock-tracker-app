"use server";

import { connect } from 'mongoose';
import { Watchlist } from '../database/models/watchlist.model';
import { User } from '../database/models/user.model'; // Assuming a User model exists
import { logger } from '../utils/logger'; // Assuming a logger utility exists

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  try {
    await connect(process.env.MONGODB_URI); // Ensure to set your MongoDB URI in environment variables

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`User not found for email: ${email}`);
      return [];
    }

    const watchlistItems = await Watchlist.find({ userId: user._id });
    return watchlistItems.map(item => item.symbol);
  } catch (error) {
    logger.error(`Error fetching watchlist symbols for email ${email}: ${error}`);
    return [];
  }
}