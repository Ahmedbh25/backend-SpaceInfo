import express from "express";
const router = express.Router();
import { verifyUser } from "../utils/verifyToken.js";

import {
    addReview,
    getallReviews,
    getuserReviews,
    getProductlReviews,
} from "../controllers/reviewController.js";

// ADD REVIEW :
router.post("/", verifyUser, addReview);

// GET REVIEWS OF AUTHENTICATED USER :
router.post("/user", verifyUser, getuserReviews);

// //GET REVIEWS FOR SPECIFIC PRODUCT:
router.post("/product", verifyUser, getProductlReviews);

//GET ALL REVIEW:
router.get("/", verifyUser, getallReviews);

export default router
