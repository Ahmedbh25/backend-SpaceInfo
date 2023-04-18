import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },

  product_id : {
    type: String,
    required: true,
  },
  
  quantity : {
    type: Number,
    required: true,
  },

  order_date : {
    type: String,
    required: true,
  },
  
  required_date : {
    type: String,
    required: true,
  },

  shipped_date : {
    type: String,
    required: true,
  },

});

export default mongoose.model("Order", OrderSchema);