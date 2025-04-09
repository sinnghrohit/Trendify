import dotenv from "dotenv";
dotenv.config(); // ✅ Load environment variables first

import "./config/passport.js"; // ✅ Passport config after .env

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Session Middleware
app.use(
  session({
    secret: "your_secret_key", // You can also store this in .env for security
    resave: false,
    saveUninitialized: false,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Trendify backend is running!");
});

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Server Start
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
