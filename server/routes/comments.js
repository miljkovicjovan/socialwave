import express from "express";
import { getComments } from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:postId/comments", verifyToken, getComments);

export default router;