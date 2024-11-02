import mongoose from "mongoose";
const likeSchema = new mongoose.Schema({
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',  // Reference to the post being liked
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the user who liked the post
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('Like', likeSchema);
  