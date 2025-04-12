import jwt from "jsonwebtoken";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

// ✅ Protect middleware - For login required
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // token nikal rahe hain

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify kar rahe hain

      req.user = await User.findById(decoded.id).select("-password"); // user info attach kar rahe hain

      next(); // authenticated => aage jao
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// ✅ Admin middleware - For admin-only access
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

// ✅ Vendor middleware - For vendor-only access
const isVendor = (req, res, next) => {
  if (req.user && req.user.role === "Vendor") {
    next();
  } else {
    res.status(403).json({ message: "Vendor access only" });
  }
};

// ✅ Super Admin middleware - For super admin-only access
const isSuperAdmin = (req, res, next) => {
  if (req.user && req.user.role === "Super Admin") {
    next();
  } else {
    res.status(403).json({ message: "Super Admin access only" });
  }
};

export { protect, isAdmin, isVendor, isSuperAdmin };
