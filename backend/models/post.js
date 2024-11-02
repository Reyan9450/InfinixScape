import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  // References the user who created the post
  },
  imageUrl: {
    type: String,
    required: true,  // Stores the URL/path to the uploaded image
  },
  caption: {
    type: String,  // Optional field for image captions
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Array of users who liked the post
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // The user who commented
    },
    comment: {
      type: String,
      required: true,  // Comment text
    },
    timestamp: {
      type: Date,
      default: Date.now,  // When the comment was posted
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,  // Timestamp of when the post was created
  },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
