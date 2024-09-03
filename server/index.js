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
import commentRoutes from "./routes/comments.js";
import notificationRoutes from "./routes/notifications.js";

// functions
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";

// setup for files
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { createPost } from "./controllers/posts.js";
import { editProfile } from "./controllers/users.js";

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${uuidv4()}-${Date.now()}`;
        const extension = path.extname(file.originalname);
        const uniqueFilename = file.fieldname + '-' + uniqueSuffix + extension;
        cb(null, uniqueFilename);
        // Store the filename in req object so you can access it in the route
        req.savedFilename = uniqueFilename;
    }
});
const upload = multer({ storage });

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

// Serve static files from the "assets" directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes with file uploads
app.post("/auth/register", register);
app.post("/posts", verifyToken, upload.single("image"), createPost);
app.patch("/users/:id/edit", verifyToken, upload.single("image"), editProfile);

// routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/notifications", notificationRoutes);

// mongoose setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((error) => console.log(`Connection error: ${error}`));