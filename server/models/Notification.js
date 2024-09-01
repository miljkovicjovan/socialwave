import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['New follower', 'Liked your post', 'Commented on your post', 'system'],
        required: true
    },
    read: { 
        type: Boolean, 
        default: false
    },
    referenceId: {
        type: String,
        required: true
    },
    referenceUsername: {
        type: String,
        required: true
    },
    referenceProfilePic: {
        type: String,
        required: true
    }
},{timestamps: true});

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;