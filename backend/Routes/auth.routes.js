import express from "express";
import {signup, login} from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", (req, res) => {
    res.send("Logout route");
})


export default router