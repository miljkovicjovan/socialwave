import mongoose from "mongoose";
import { CommentSchema } from "./Comment.js";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
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
        profilePic: {
            type: String,
            default: "",
        },
        description: String,
        postPic: {
            type: String,
            default: "",
        },
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: [CommentSchema],
            default: [],
        },
    }
);

const Post = mongoose.model("Post", PostSchema);
export { PostSchema };
export default Post;