import express from "express";
import { getNotifications, createNotification } from "../controllers/notifications.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, getNotifications);

router.post("/create", verifyToken, createNotification);

export default router;