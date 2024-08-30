import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Button, Typography, useTheme, useMediaQuery} from "@mui/material";

import FlexBetween from "components/FlexBetween";
import Nav from "scenes/nav";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserImage from "components/UserImage";
import UserListModal from "components/modals/UserListModal";

const Profile = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [type, setType] = useState("");

    const [user, setUser] = useState(null);
    const { username } = useParams();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${username}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };
    
    const handleFollow = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/${loggedInUserId}/follow`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({followId: user._id})
            });
            if (response.ok) {
                getUser();
            } else {
                console.error('Failed to follow/unfollow user');
            }
        } catch (err) {console.error('Error:', err);}
    }

    const handleRemoveFollower = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/${loggedInUserId}/remove`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({followerId: user._id})
            });
            if (response.ok) {
                getUser();
            } else {
                console.error('Failed to remove follower');
            }
        } catch (err) {console.error('Error:', err);}
    }

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    return (
        <Box>
            <Nav setUser={setUser}/>
            <Box
                width={isNonMobileScreens ? "40%" : "93%"}
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
                                <Typography
                                    sx={{"&:hover":{color:"white", cursor:"pointer"}}}
                                    onClick={() => {
                                        setType("followers");
                                        handleOpen();
                                    }}
                                >
                                    {user.followers.length} {user.followers.length === 1 ? "follower" : "followers"}
                                </Typography>
                                <Typography
                                    sx={{"&:hover":{color:"white", cursor:"pointer"}}}
                                    onClick={() => {
                                        setType("following");
                                        handleOpen();
                                    }}
                                >
                                    {user.following.length} following
                                </Typography>
                            </FlexBetween>
                        </Box>
                        <Box>
                            <UserImage size="120"/>
                        </Box>
                    </FlexBetween>
                    {loggedInUserId === user._id ? (
                        <Box marginTop="1rem" display="flex" justifyContent="center">
                            <Button
                                variant="contained"
                                sx={{width:"100%", border:"2px solid gray", color:"white"}}
                            >
                                Edit profile
                            </Button>
                        </Box>
                    ): (
                        <Box marginTop="1rem" display="flex" justifyContent="center" gap="2rem">
                            <Button
                                variant="contained"
                                sx={{width:"100%", border:"2px solid gray", color:"white"}}
                                onClick={handleFollow}
                            >
                                {user.followers.includes(loggedInUserId) ? "Unfollow" : "Follow"}
                            </Button>
                            {user.following.includes(loggedInUserId) && (
                                <Button
                                    variant="contained"
                                    sx={{width:"100%", border:"2px solid gray", color:"white"}}
                                    onClick={handleRemoveFollower}
                                >
                                    Remove Follower
                                </Button>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
            <PostsWidget userId={user._id} isProfile />
            <UserListModal user={user} setUser={setUser} open={open} handleClose={handleClose} type={type} userId={user._id} />
        </Box>
    );
}
export default Profile;