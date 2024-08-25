import express from "express";
import { getUser, followUnfollow, removeFollower } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:username", verifyToken, getUser);
router.get("/:id/followers", verifyToken, getUser);
router.get("/:id/following", verifyToken, getUser);

router.patch("/:id/:followerId", verifyToken, followUnfollow);
router.patch("/:id/:followingId", verifyToken, removeFollower);

export default router;