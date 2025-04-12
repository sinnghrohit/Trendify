import express from "express";
import passport from "passport";
import User from "../models/user.js";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

// --- Email login/signup ---
router.post("/register", registerUser);
router.post("/login", loginUser);

// --- Protected Route Test ---
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Yeh protected route hai",
    user: req.user,
  });
});

// --- Google OAuth Routes ---

// Step 1: Redirect to Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth/login-fail",
    session: false,
  }),
  async (req, res) => {
    try {
      const email = req.user?.email;

      if (!email) {
        console.error("No email found in Google profile");
        return res.redirect("/api/auth/login-fail");
      }

      // Check if user exists
      let existingUser = await User.findOne({ email });

      if (!existingUser) {
        existingUser = new User({
          name: req.user.name,
          email: email,
          password: "google-oauth", // Dummy password
        });
        await existingUser.save();
      }

      // Generate JWT
      const token = generateToken(existingUser._id);

      // Redirect to frontend with token
      res.redirect(`http://localhost:3000?token=${token}`);
    } catch (error) {
      console.error("Google OAuth callback error:", error.message);
      res.redirect("/api/auth/login-fail");
    }
  }
);

// --- Handle OAuth Failures Gracefully ---
router.get("/login-fail", (req, res) => {
  res.status(401).json({ message: "Google login failed. Try again." });
});

export default router;
