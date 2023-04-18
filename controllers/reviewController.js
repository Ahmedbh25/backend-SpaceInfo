import mongoose from "mongoose";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

export const addReview = async (req, res, next) => {
  const { review, userID, productID } = req.body.data;
  const review_data = {
    rating: review.rating,
    review: review.review,
    prod_id: productID,
    user_id: userID
  }
  try {
    try{
      if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ message: 'Invalid user ID' });
      }
      if (!mongoose.Types.ObjectId.isValid(productID)) {
        return res.status(404).json({ message: 'Invalid Product ID' });
      }
      const user = await User.findById(userID);
      const product = await Product.findById(productID);
      if (!product){
        return res.status(404).json({ message: 'Product not found !' });
      }else if(!user){
        return res.status(404).json({ message: 'User not found !' });
      }
    }catch(error){
      next(error)
    }

    
    try {
      const fetchReview = await Review.find({ user_id: userID, prod_id: productID });
      if (fetchReview.length > 0) {
        return res.status(404).json({message:"You have been add this review on The Same Product Before ! "});
      }
    } catch (error) {
      next(error)
    }

    try {
      const newReview = new Review(review_data);
      const saved_rev = await newReview.save();
      res.status(200).json({message :"Review was successfully added", saved_rev});
    } catch (error) {
      next(error);
    }

    await User.findByIdAndUpdate(userID, { $push: { reviews: saved_rev._id } });
    await Product.findByIdAndUpdate(productID, { $push: { reviews: saved_rev._id } });
  } catch (error) {
    next(error);
  }
}

// GET ALL REVIEWS : 
export const getallReviews = async(req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews)
  } catch(error){
    next(error);
  }
}


// GET USER REVIEWS :
export const getuserReviews = async(req, res, next) => {
  const userID = req.body.userID;
  try {
    const reviews = await Review.find({user_id : userID});
    if(!reviews){
      return res.status(400).json("You Have No Reviews Yet")
    }
    res.status(200).json(reviews)
  } catch(error){
    next(error);
  }
}

export const getProductlReviews = async(req, res, next)=>{
  const productID = req.body.productID;
  try{
    const reviews = await Review.find({prod_id : productID});
    if(!reviews){
      return res.status(404).json("There Is No Reviews For This Product")
    }
    res.status(200).json(reviews);
  }catch(error){
    next(error)
  }
}