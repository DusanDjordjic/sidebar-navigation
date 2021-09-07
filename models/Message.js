import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

export default mongoose.models["Message"] ||
  mongoose.model("Message", messageSchema, "messages");
