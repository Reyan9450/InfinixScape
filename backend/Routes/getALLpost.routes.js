import { getAllPosts } from "../controllers/scroller.controller.js";
import { protect } from "../middlewares/protectRoutes.js";
import express from "express";

const allPost = express.Router();

allPost.get("/", protect, getAllPosts);
export default allPost