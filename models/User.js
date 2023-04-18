import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    first_name :{
      type: String,
      required: true,
    },
    
    last_name :{
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    
    image: {
      type: String,
    },

    phone: {
      type: String,
      required: true,
    },
  
    isAdmin: {
      type: Boolean,
      default: false,
    },

    contacts : {
      type: [String],
    },

    reviews : {
      type: [String],
    }

  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);