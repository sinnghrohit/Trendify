import express from "express";
const router = express.Router();

import { registerUser, loginUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin, isVendor, isSuperAdmin } from "../middleware/authMiddleware.js";  // Import the correct role-based middlewares

// Routes
router.post("/", registerUser); // Register a user
router.post("/login", loginUser); // User login
router.get("/profile", protect, getUserProfile); // Get user profile (only authenticated users)
router.put("/profile", protect, isAdmin, updateUserProfile); // Update user profile (for authenticated users with Admin role)

// Admin routes (Only Admins or Super Admins can access this)
router.get("/admin", protect, isAdmin, (req, res) => {
  res.send("Admin Panel: Only Admin or Super Admin can see this");
});

// Vendor routes (Only Vendor, Admin, or Super Admin can access this)
router.get("/vendor", protect, isVendor, (req, res) => {
  res.send("Vendor Panel: Only Vendor or Admin can see this");
});

// Super Admin routes (Only Super Admin can access this)
router.get("/superadmin", protect, isSuperAdmin, (req, res) => {
  res.send("Super Admin Panel: Only Super Admin can see this");
});

export default router;
