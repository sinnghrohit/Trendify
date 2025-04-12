import express from "express";
import passport from "passport";

const router = express.Router();

// Route to initiate Facebook Login
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

// Facebook Callback Route
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/login/failed", // frontend par yeh handle karo
  }),
  (req, res) => {
    // Success redirect or token send
    res.send("✅ Facebook login successful!");
  }
);

export default router;
