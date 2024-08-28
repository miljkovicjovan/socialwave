import Post from "../models/Post.js";
import User from "../models/User.js";

/* ---- CREATE ---- */
// Creating a post
export const createPost = async (req, res) => {
    try {
        const { userId, description } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const savedFilename = req.savedFilename;

        const newPost = new Post ({
            userId,
            username: user.username,
            profilePic: user.profilePic,
            description,
            imagePath: savedFilename,
            likes: {},
            comments: [],
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/* ---- READ ---- */
// Get timeline(feed) of posts
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Get timeline(feed) of posts for a single user
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/*  ---- UPDATE ---- */
// Like/dislike a post
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!userId || !id) {
            return res.status(400).json({ message: "Invalid parameters" });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        // update the post with new like status
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/*  ---- DELETE ---- */
// delete a post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the post by ID and delete it
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Post deleted successfully', data: deletedPost });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}