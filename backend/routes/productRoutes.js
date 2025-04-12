// routes/productRoutes.js
import express from "express";
import { getAllProducts, createProduct } from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public: Get all products
router.get("/", getAllProducts);

// ✅ Admin Only: Add new product
router.post("/", protect, isAdmin, createProduct);

export default router;
