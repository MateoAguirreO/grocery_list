import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import itemsRouter from "./routes/items.js";

dotenv.config();

const app = express();

app.use(clerkMiddleware()); 

app.use(cors({
  origin: "http://localhost:4321", 
  credentials: true
}));

app.use(express.json());

app.use("/api/items", itemsRouter);

app.get("/", (req, res) => {
  res.send("Grocery List API is running.");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
