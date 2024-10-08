import { useEffect, forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { setPosts } from "state";

import PostWidget from "./PostWidget";
import { Box, useMediaQuery } from "@mui/material";

const PostsWidget = forwardRef(({ userId, isProfile = false }, ref) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const response = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(
            `http://localhost:3001/posts/${userId}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const refreshPosts = () => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }

    // Expose the refreshPosts function to the parent component
    useImperativeHandle(ref, () => ({
        refreshPosts
    }));

    useEffect(() => {
        refreshPosts();
    }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

    // Sort posts from newest to oldest before rendering
    const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <Box width={isNonMobileScreens ? "40%" : "75%"} sx={{margin:"1rem auto"}}>
            {sortedPosts.map(
                ({
                    _id,
                    userId,
                    createdAt,
                    profilePic,
                    username,
                    description,
                    imagePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        timestamp={createdAt}
                        profilePic={profilePic}
                        name={username}
                        description={description}
                        imagePath={imagePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </Box>
    );
});

export default PostsWidget;