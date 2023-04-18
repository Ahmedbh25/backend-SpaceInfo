import express from "express";
import {
  getProduct,
  getProducts,
  getProductByRef,
  getProductByName,
  BuyProduct,
  createProduct,
} from "../controllers/productController.js";

const router = express.Router();
import {verifyAdmin} from '../utils/verifyToken.js';

//GET PRODUCT BY ID :
router.get("/:prodID", getProduct);


//GET ALL PRODUCTS :
router.get("/", getProducts);

//CREATE PRODUCT :
router.post("/", verifyAdmin, createProduct);

//GET PRODUCT BY REFERENCE :
router.post("/one", getProductByRef);

//GET ALL PRODUCT THAT MATCH NAME :
router.post("/name", getProductByName);

// BUY PRODUCT :
router.post("/buy", BuyProduct);

export default router;