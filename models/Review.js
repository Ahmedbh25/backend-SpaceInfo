import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  prod_id: {
    type: String,
    required: true,
  },

  user_id: {
    type: String,
    required: true,
  },

});

export default mongoose.model("Review", ReviewSchema);