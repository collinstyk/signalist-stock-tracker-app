"use server";

import { connectToDatabase } from "@/database/mongoose";
import { Watchlist } from "@/database/models/watchlist.model";

export async function getWatchlistSymbolsByEmail(
  email: string,
): Promise<string[]> {
  try {
    const mongoose = await connectToDatabase();
    const { db } = mongoose.connection;

    if (!db) throw new Error("MongoDB connection not found");

    const user = await db.collection("user").findOne<{
      _id?: unknown;
      id?: string;
      email?: string;
    }>({ email });

    if (!user) return [];

    const userId = user.id;

    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();

    console.log(items);
    return items.map((i) => String(i.symbol).toUpperCase());
  } catch (error) {
    console.error(
      `Error fetching watchlist symbols for email ${email}: ${error}`,
    );
    return [];
  }
}
