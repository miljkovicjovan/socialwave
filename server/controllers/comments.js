import Comment from "../models/Comment.js";

/* ---- CREATE ---- */
// Creating a comment
export const createComment = async (req, res) => {
    try {
        const { userId, text } = req.body;

        if (!userId || !text) {
            return res.status(400).json({ error: "User ID and text are required" });
        }

        const user = await User.findById(userId);

        const newComment = new Comment ({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePic: user.profilePic,
            text
        })
        await newComment.save();

        // after saving the new comment make sure to retreive all comments again
        const comment = await Comment.find();
        res.status(201).json(comment);
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