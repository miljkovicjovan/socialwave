import mongoose from "mongoose";
import { CommentSchema } from "./Comment.js";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        username: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 15,
        },
        profilePic: {
            type: String,
            default: "",
        },
        description: String,
        imagePath: {
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
    },{timestamps: true}
);

const Post = mongoose.model("Post", PostSchema);
export { PostSchema };
export default Post;