import Notification from "../models/Notification.js";
import User from "../models/User.js";

/* ---- CREATE ---- */
// Creating a notification
export const createNotification = async (req, res) => {
    try {
        const { userId, type, referenceId, referenceUsername, referenceProfilePic } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

         // Check if a notification of the same type already exists
         const existingNotification = await Notification.findOne({
            userId,
            type,
            referenceId
        });

        if (existingNotification) {
            return res.status(200).json({ message: "Notification already exists" });
        }

        const newNotification = new Notification ({
            userId,
            read: false,
            type,
            referenceId,
            referenceUsername,
            referenceProfilePic
        })
        await newNotification.save();

        const notification = await Notification.find();
        res.status(201).json(notification);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/* ---- READ ---- */
// Get notifications
export const getNotifications = async (req, res) => {
    try {
        const { userId } = req.body;
        const notifications = await Notification.find({ userId });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}