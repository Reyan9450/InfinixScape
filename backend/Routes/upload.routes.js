import express from 'express';
import Post from '../models/post.js'; // Your Post model
import upload from '../middlewares/upload.js'; // Multer middleware for file upload
import { protect } from '../middlewares/protectRoutes.js'; // JWT protect middleware

const uploadRouter = express.Router();

// Route to upload an image and save the image path in the database
uploadRouter.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Define the file path (assuming images are stored in 'uploads' folder)
    const filePath = `uploads/${req.file.filename}`;

    // Create a new post with the image path and user-provided data
    const newPost = new Post({
      description: req.body.description, // Optional: set description from req.body
      user: req.user._id, // Assuming req.user contains the authenticated user
      imageUrl: filePath, // Store image path for later retrieval
    });

    // Save the new post to the database
    await newPost.save();

    // Respond with the created post data
    res.status(201).json({
      message: "Image uploaded successfully",
      post: newPost, // Send back full post object for frontend use
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image", error });
  }
});

export default uploadRouter;
