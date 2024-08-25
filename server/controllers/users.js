import User from "../models/User.js";

/* ---- READ ---- */
// Get a user
export const getUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({username:username});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Get a users followers list
export const getUserFollowers = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const followers =  await Promise.all(
            user.followers.map((id) => User.findById(id))
        );

        const formattedFollowers = followers.map (
            ({ _id, firstname, lastName, picturePath }) => {
                return { _id, firstname, lastName, picturePath }
            }
        );

        res.status(200).json(formattedFollowers);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Get a users following list
export const getUserFollowing = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const following =  await Promise.all(
            user.following.map((id) => User.findById(id))
        );

        const formattedFollowing = following.map (
            ({ _id, firstname, lastName, picturePath }) => {
                return { _id, firstname, lastName, picturePath }
            }
        );

        res.status(200).json(formattedFollowing);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* ---- UPDATE ---- */
// Follow/Unfollow a user functionality
export const followUnfollow = async (req, res) => {
    try {
        const { id, followId } = req.params;
        
        const user = await User.findById(id);
        const follow = await User.findById(followId);
        if (!user || !follow) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.following.includes(followId)) {
            user.following = user.following.filter((id) => id !== followId);
            follow.followers = follow.followers.filter((id) => id !== id);
        } else {
            user.following.push(followId);
            follow.followers.push(id);
        }
        await user.save();
        await follow.save();

        const following =  await Promise.all(
            user.following.map((id) => User.findById(id))
        );

        const formattedFollowing = following.map (
            ({ _id, firstname, lastName, picturePath }) => {
                return { _id, firstname, lastName, picturePath }
            }
        );

        res.status(200).json(formattedFollowing);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Remove a follower functionality
export const removeFollower = async (req, res) => {
    try {
        const { id, followerId } = req.params;

        const user = await User.findById(id);
        const follower = await User.findById(followerId);
        if (!user || !follower) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.followers.includes(follwerId)) {
            user.followers.filter((id) => id !== followerId);
            follower.following.filter((id) => id !== id);
        }
        await user.save();
        await follower.save();

        const followers =  await Promise.all(
            user.followers.map((id) => User.findById(id))
        );
        
        const formattedFollowers = followers.map (
            ({ _id, firstname, lastName, picturePath }) => {
                return { _id, firstname, lastName, picturePath }
            }
        );

        res.status(200).json(formattedFollowers);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}