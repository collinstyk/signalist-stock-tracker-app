import { NextResponse } from "next/server.js";
import "dotenv/config";
import { connectToDatabase } from "../../database/mongoose.ts";

async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ ok: true, message: "✅ MongoDB connected!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "❌ DB connection failed", error: String(error) },
      { status: 500 },
    );
  }
}

GET();
