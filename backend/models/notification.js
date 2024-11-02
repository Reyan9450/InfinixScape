
import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // The user who will receive the notification
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String,  // Link to the post/comment/etc. that triggered the notification
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('Notification', notificationSchema);
  