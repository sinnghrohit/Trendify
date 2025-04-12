import User from "../models/user.js";
import jwt from "jsonwebtoken";

// 🔐 Generate JWT token with role
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ✅ @desc   Register new user
// ✅ @route  POST /api/auth/register
export const registerUser = async (req, res) => {
  const { name, email, password, role = "User" } = req.body;  // default role: User

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id, user.role);

    res.status(201).json({ 
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ @desc   Login user
// ✅ @route  POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id, user.role);

    res.json({ 
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ @desc   Google OAuth Callback
// ✅ @route  GET /api/auth/google/callback
export const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Google authentication failed" });
    }

    const token = generateToken(req.user._id, req.user.role || "User");

    // Redirect to frontend with token in query
    res.redirect(`http://localhost:3000?token=${token}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "OAuth callback failed" });
  }
};
