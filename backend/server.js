import express from "express";
import { connectMongo } from "./connectDB/connectMongo.js";
import router from "./Routes/auth.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/user.router.js";
import uploadRouter from "./Routes/upload.routes.js";
import allPost from "./Routes/getALLpost.routes.js";
import cors from "cors"; // Import CORS

dotenv.config();

const app = express();
// onsole.log("Environment Variables:", process.env);

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Allow only your frontend origin
    credentials: true, // Allow cookies to be sent
};

// Use CORS middleware with options
app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);
app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/posts", allPost);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(5000, () => {
    connectMongo();
    console.log("Server running on port 5000");
});
