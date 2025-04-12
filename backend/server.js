// backend/server.js

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import passport from "passport";
import connectDB from "./config/db.js"; // 🔥 MongoDB config file

// Passport strategy config
import "./config/passport.js";

// Routes
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import facebookAuthRoutes from "./routes/facebookAuthRoutes.js"; // ✅ Added Facebook auth route

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize()); // ✅ Passport middleware (JWT, OAuth, etc.)

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", facebookAuthRoutes); // ✅ Added this line

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Trendify backend is running!");
});

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
