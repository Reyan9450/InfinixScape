import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',  // Reference to the post this comment belongs to
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the user who made the comment
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('Comment', commentSchema);
  