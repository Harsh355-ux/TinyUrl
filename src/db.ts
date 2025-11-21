import mongoose from "mongoose";

export const connectDB = async () => {
  const url = process.env.MONGO_URL;

  if (!url) {
    throw new Error("❌ MONGO_URL missing in .env");
  }

  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
