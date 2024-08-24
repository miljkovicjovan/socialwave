// core framework
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// security & middleware
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";

// routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

// functions
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

// Load environment variables
dotenv.config();

// Security and Middleware setup
const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(helmet()); // Secure app by setting HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common")); // Log HTTP requests
app.use(bodyParser.json({ limit: "30mb", extended: true})); // Size limit 30MB
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors()); // Cross Origin Resource Sharing

// routes with file uploads
app.post("/auth/register", register);
//app.post("/posts", verifyToken, upload.single("picture"), createPost);

// routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// mongoose setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((error) => console.log(`Connection error: ${error}`));