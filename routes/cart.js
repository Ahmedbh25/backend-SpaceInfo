import express from "express";
import { createCart, userCard, showALLCard, DeleteCard } from "../controllers/cartController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// ADD Cart
router.post("/add", verifyAdmin, createCart);

// GET USER CART :
router.post("/", verifyUser, userCard);

// GET ALL CARDS :
router.post("/all", verifyAdmin, showALLCard);

// DELETE Cart
router.delete("/", verifyAdmin, DeleteCard);

export default router;