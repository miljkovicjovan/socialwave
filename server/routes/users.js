import express from "express";
import { getUser, followUnfollow, removeFollower, batchList } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:username", verifyToken, getUser);
router.get("/:id/followers", verifyToken, getUser);
router.get("/:id/following", verifyToken, getUser);

router.patch("/:id/follow", verifyToken, followUnfollow);
router.patch("/:id/remove", verifyToken, removeFollower);

router.post('/batch', verifyToken, batchList);

export default router;