import mongoose from "mongoose";
const ContactSchema = new mongoose.Schema({
  contact_message: {
    type: String,
    required: true,
  },

});

export default mongoose.model("Contact", ContactSchema);