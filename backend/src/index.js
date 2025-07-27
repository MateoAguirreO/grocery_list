import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import itemsRouter from "./routes/items.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/items", itemsRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("DB error:", err));
app.get("/", (req, res) => {
  res.send("Grocery List API is running.");
});