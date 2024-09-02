import { formatDistanceToNow } from 'date-fns';

import { Typography, Box } from "@mui/material";

import UserImage from "./UserImage";

const CommentsBox = ({ comments }) => {
    return ( 
        <Box>
             {comments.map(
                ({
                    _id,
                    username,
                    profilePic,
                    text,
                    createdAt
                }) => (
                    <Box key={_id} display="flex" alignItems="center" pb="1rem">
                        <Box pr="0.5rem">
                            <UserImage image={profilePic ? profilePic : "default.jpg"} size='30px'/>
                        </Box>
                        <Box>
                            <Box display="flex">
                                <Typography pr="0.5rem" fontWeight="700">
                                    {username}
                                </Typography>
                                <Typography color="gray">
                                    {formatDistanceToNow(new Date(createdAt),{addSuffix:true})}
                                </Typography>
                            </Box>
                            <Typography>
                                {text}
                            </Typography>
                        </Box>
                    </Box>
                )
            )}
        </Box> 
    );
}
export default CommentsBox;