import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

/* ---- CREATE ---- */
// Creating a comment
export const createComment = async (req, res) => {
    try {
        const { userId, postId, text } = req.body;

        if (!userId || !postId || !text) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findById(userId);
        const post = await Post.findById(postId);

        if (!user || !post) {
            return res.status(404).json({ message: "User or Post not found" });
        }

        const newComment = new Comment ({
            userId,
            postId,
            username: user.username,
            profilePic: user.profilePic,
            text
        })
        await newComment.save();

        // add the comment directly to the post's comments array
        post.comments.push(newComment);
        await post.save();

        // return the updated post's comments
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/* ---- READ ---- */
// Get comments of posts
export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ error: "Post ID is required" });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // get the post's comments
        const comments = post.comments;
        res.status(200).json(comments);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}