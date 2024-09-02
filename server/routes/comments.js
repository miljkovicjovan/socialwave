import express from "express";
import { createComment, getComments } from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:postId/comments", verifyToken, getComments);
router.post("/comment", verifyToken, createComment);

export default router;