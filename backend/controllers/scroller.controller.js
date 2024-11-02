// Backend Route: GET /api/posts?page=1&limit=10


import Post from "../models/post.js";


export const getAllPosts = async (req, res) => {
    try {

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;
  
      const posts = await Post.find().skip(startIndex).limit(limit).sort({ createdAt: -1 });
      const totalPosts = await Post.countDocuments();
  
      res.status(200).json({
        posts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit)
        
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts" });
    }
  };


  