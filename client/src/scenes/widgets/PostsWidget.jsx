import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

import PostWidget from "./PostWidget";
import { Box, useMediaQuery } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false }) => {
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

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box width={isNonMobileScreens ? "40%" : "93%"} sx={{margin:"1rem auto"}}>
            {posts.map(
                ({
                    _id,
                    userId,
                    createdAt,
                    profilePic,
                    username,
                    description,
                    likes,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        timestamp={createdAt}
                        profilePic={profilePic}
                        name={username}
                        description={description}
                        likes={Object.keys(likes).length}
                    />
                )
            )}
        </Box>
    );
};

export default PostsWidget;