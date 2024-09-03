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

// Batch list of info by sending in array of ids
export const batchList = async (req, res) => {
    const { userIds } = req.body;
    const users = await User.find({ _id: { $in: userIds } });
    res.json(users);
};

/* ---- UPDATE ---- */
// Follow/Unfollow a user functionality
export const followUnfollow = async (req, res) => {
    try {
        const { id } = req.params;
        const { followId } = req.body;
        
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
        const { id } = req.params;
        const { followerId } = req.body;

        const user = await User.findById(id);
        const follower = await User.findById(followerId);
        if (!user || !follower) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.followers.includes(followerId)) {
            user.followers = user.followers.filter((id) => id !== followerId);
            follower.following = follower.following.filter((id) => id !== id);
        }
        await user.save();
        await follower.save();

        const followers =  await Promise.all(
            user.followers.map((id) => User.findById(id))
        );
        
        const formattedFollowers = followers.map (
            ({ _id, firstname, lastName, picturePath, followers, following }) => {
                return { _id, firstname, lastName, picturePath, followers, following }
            }
        );

        res.status(200).json(formattedFollowers);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Edit profile functionality
export const editProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, firstName, lastName, profilePic, bio } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const savedFilename = req.savedFilename;

        // Update the user's profile with the new data
        if (username) user.username = username;
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (profilePic) user.profilePic = savedFilename;
        if (bio) user.bio = bio;

        // Save the updated user document
        await user.save();

        // Respond with the updated user data
        res.status(200).json({ message: "Profile updated successfully", user });

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}