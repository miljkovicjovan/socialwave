import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
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
        text: {
            type: String,
            required: true,
        }
    },{timestamps: true}
);

const Comment = mongoose.model("Comment", CommentSchema);

export { CommentSchema };
export default Comment;