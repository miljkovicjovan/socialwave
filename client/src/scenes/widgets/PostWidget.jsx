import { Typography, useTheme, Box } from "@mui/material";
import { colorTokens } from "theme";
import { formatDistanceToNow } from 'date-fns';
import UserImage from "components/UserImage";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from "react-router-dom";
import {IconButton, Button} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PostOptionsModal from "components/PostOptionsModal";

const PostWidget = ({
    timestamp,
    profilePic,
    name,
    description,
    likes
}) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const { palette } = useTheme();
    const main = palette.neutral.main;

    const likeCount = Object.keys(likes).length;

    const handleOptionsOpen = () => setOpen(true);

    return (
        <Box 
            padding="0.6rem 1rem 0rem 1rem" 
            sx={{border:"1px solid gray", backgroundColor:colorTokens.grey[800]}}
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
                            sx={{
                                "&:hover": {
                                    cursor: "pointer"
                                },
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography color="gray">{formatDistanceToNow(new Date(timestamp), { addSuffix: true })}</Typography>
                    </Box>
                </Box>
                <IconButton onClick={handleOptionsOpen}>
                    <MoreHorizIcon/>
                </IconButton>
            </FlexBetween>
            <Typography color={main} sx={{mt:"1rem", ml:"0.5rem"}}>{description}</Typography>

            <Box margin="1rem 0 0.2rem 0" gap="0.1rem">
                <Button onClick={handleLike} color="error" sx={{minWidth:"0", borderRadius:"20px"}}>
                    <FavoriteBorderIcon/>
                    <Typography pl="0.2rem">{likeCount}</Typography>
                </Button>
                <Button sx={{minWidth:"0", borderRadius:"20px"}}>
                    <ChatBubbleIcon/>
                    <Typography pl="0.2rem">0</Typography>
                </Button>
            </Box>
            
            <PostOptionsModal open={open} setOpen={setOpen}/>

        </Box>
    );
  };
  
  export default PostWidget;