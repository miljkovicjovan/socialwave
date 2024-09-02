import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "",
        },
        text: {
            type: String,
            required: true,
        }
    },{timestamps: true}
);

const Comment = mongoose.model("Comment", CommentSchema);

export { CommentSchema };
export default Comment;