import User from "../models/user.js";
import express from "express";
import {protect} from "../middlewares/protectRoutes.js";
import { getUsers } from "../controllers/user.controller.js";
import { getPosts } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/:id", protect, getUsers);
router.get("/posts/:id", protect, getPosts);
export default router