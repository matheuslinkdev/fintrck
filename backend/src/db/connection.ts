import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wphaumh.mongodb.net/fintrckdb?retryWrites=true&w=majority&appName=Cluster0`;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {});
    console.log("MongoDB connected...");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
};
