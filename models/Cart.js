import mongoose from "mongoose";
const CartSchema = new mongoose.Schema(
  {
    user_id :{
      type : String,
      required : true,
      unique: true,
    },
    money_budget : {
      type : Number,
      required : true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);