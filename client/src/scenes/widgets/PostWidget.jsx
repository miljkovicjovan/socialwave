import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPost } from "state";

import { Typography, useTheme, Box, IconButton, Button } from "@mui/material";
import { MoreHoriz, FavoriteBorderOutlined, FavoriteOutlined, ChatBubble } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import PostOptionsModal from "components/PostOptionsModal";

const PostWidget = ({
    postId,
    postUserId,
    timestamp,
    profilePic,
    name,
    description,
    imagePath,
    likes
}) => { 
    const [optionsOpen, setOptionsOpen] = useState(false);
    const handleOptionsOpen = () => setOptionsOpen(true);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const neutralLight = palette.neutral.light;

    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({userId: loggedInUserId})
            });
            const updatedPost = await response.json();
            dispatch(setPost({ post: updatedPost }));
        } catch (err) {console.error('Error:', err);}
    }

    return (
        <Box 
            margin="1rem 0"
            padding="0.6rem 1rem 0rem 1rem"
            sx={{border:"1px solid gray", borderRadius:"20px", backgroundColor:neutralLight}}
        >
            <FlexBetween >
                <Box display="flex" flexDirection="row">
                    <UserImage 
                        image={profilePic? profilePic : "default.jpg"} 
                        size="40px"
                        onClick={() => navigate(`/profile/${name}`)}
                    />
                    <Box paddingLeft="10px">
                        <Typography 
                            onClick={() => navigate(`/profile/${name}`)}
                            fontWeight="700" 
                            variant="h5"
                            sx={{"&:hover": {cursor: "pointer"}}}
                        >
                            {name}
                        </Typography>
                        <Typography color="gray">{formatDistanceToNow(new Date(timestamp),{addSuffix:true})}</Typography>
                    </Box>
                </Box>
                {postUserId === loggedInUserId &&(<IconButton onClick={handleOptionsOpen}><MoreHoriz/></IconButton>)}
            </FlexBetween>
            <Typography color={main} sx={{mt:"1rem", ml:"0.5rem"}}>{description}</Typography>
            {imagePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/uploads/${imagePath}`}
                />
            )}
            <Box margin="1rem 0 0.2rem 0" gap="0.1rem">
                <Button onClick={handleLike} color="error" sx={{minWidth:"0", borderRadius:"20px"}}>
                    {isLiked ? (<FavoriteOutlined/>) : (<FavoriteBorderOutlined/>)}
                    <Typography pl="0.2rem">{likeCount}</Typography>
                </Button>
                <Button sx={{minWidth:"0", borderRadius:"20px"}}>
                    <ChatBubble/>
                    <Typography pl="0.2rem">0</Typography>
                </Button>
            </Box>
            {postUserId === loggedInUserId && (<PostOptionsModal postId={postId} open={optionsOpen} setOpen={setOptionsOpen}/>)}
        </Box>
    );
  };
  
  export default PostWidget;