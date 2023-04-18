import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  reference : {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  categorie: {
    type: String,
    required: true,
  },

  stock:{
    type: Number,
    required: true, 
  },
  
  photo: {
    type: String,
    required: true,
  },

  inStock:{
    type: Boolean,
    required: true,
  },

  rating: {
    type: Number,
    min: 0,
    max: 10,
  },

  reviews:{
    type: [String],
  }

});

export default mongoose.model("Product", ProductSchema);