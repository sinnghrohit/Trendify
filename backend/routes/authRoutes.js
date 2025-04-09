import express from "express";
import passport from "passport";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import generateToken from "../utils/generateToken.js"; // ✅ correct import

const router = express.Router();

// --- Email login/signup ---
router.post("/register", registerUser);
router.post("/login", loginUser);

// --- Protected route test ---
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Yeh protected route hai",
    user: req.user,
  });
});

// --- Google OAuth Routes ---
// Step 1: Start Google OAuth login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Callback URL after login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    // Redirect frontend with token
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

export default router;
