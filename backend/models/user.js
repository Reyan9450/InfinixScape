import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      index: true,  // Optimized for faster lookups
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address'],  // Email format validation
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],  // Inclusive gender options
    },
    profilePic: {
      type: String,
      default: "path_to_default_image",  // Provide a default path or URL
    },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Referencing User model for followers
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Referencing User model for following
    }],
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);
export default User;
