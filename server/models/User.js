import mongoose from "mongoose";
import { PostSchema } from "./Post.js";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 15,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
        },
        bio: {
            type: String,
            default: "",
            maxlength: 60,
        },
        posts: {
            type: [PostSchema],
            default: [],
        },
        email: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        },
        following: {
            type: Array,
            default: [],
        },
        followers: {
            type: Array,
            default: [],
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
        },
        profilePic: {
            type: String,
            default: "",
        },
        backgroundPic: {
            type: String,
            default: "",
        },
    },{timestamps: true}
);

const User = mongoose.model("User", UserSchema);
export default User;