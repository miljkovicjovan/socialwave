import { Box, Button, Typography, useTheme,} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Nav from "scenes/nav";
import UserImage from "components/UserImage";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;

    const [user, setUser] = useState(null);
    const { username } = useParams();
    const token = useSelector((state) => state.token);
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${username}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };
    
    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    return (
        <Box>
            <Nav/>
            <Box
                width="30%"
                padding="2rem"
                m="3rem auto"
                borderRadius="15px"
                border="2px solid gray"
                sx={{backgroundColor: neutralLight}}
            >
                <Box>
                    <FlexBetween>
                        <Box>
                            <Typography variant="h3" marginBottom="0.8rem" sx={{fontWeight: 700}}>{user.username}</Typography>
                            <Typography variant="h4">{`${user.firstName} ${user.lastName}`}</Typography>
                            <Typography fontStyle="italic">{user.bio ? user.bio : "No bio yet..."}</Typography>
                            <FlexBetween marginTop="1rem" color="gray" gap={3}>
                                <Typography>{user.posts.length} {user.posts.length === 1 ? "post" : "posts"}</Typography>
                                <Typography>{user.followers.length} {user.followers.length === 1 ? "follower" : "followers"}</Typography>
                                <Typography>{user.following.length} following</Typography>
                            </FlexBetween>
                        </Box>
                        <Box>
                            <UserImage size="120"/>
                        </Box>
                    </FlexBetween>
                    <Box marginTop="1rem" display="flex" justifyContent="center">
                        <Button
                        
                            sx={{width:"100%", border:"2px solid gray", color:"white"}}
                        >
                            Edit profile
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
export default Profile;