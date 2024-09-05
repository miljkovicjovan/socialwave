import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "state";

import { Box, Button, Typography, useTheme, useMediaQuery} from "@mui/material";

import FlexBetween from "components/FlexBetween";
import Nav from "../nav";
import PostsWidget from "components/widgets/PostsWidget";
import UserImage from "components/UserImage";
import UserListModal from "components/modals/UserListModal";
import EditProfileModal from "components/modals/EditProfileModal";
import ErrorModal from "components/modals/ErrorModal";

const Profile = () => {
    // posts widget ref: for refreshing posts when profile edited
    const postsWidgetRef = useRef(null);

    // theme/ui settings
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;

    // User list modal states
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // notification type
    const [type, setType] = useState("");

    // important user/token info
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);
    const { username } = useParams();
    const loggedInUser = useSelector((state) => state.user);
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${username}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    // edit profile modal
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // duplicate username error
    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);
    const handleOpenError = (error) => { 
        setError(error)
        setOpenError(true);
    }
    const handleCloseError = () => {
        setOpenError(false);
        handleOpenEdit();
    }

    const sendNotification = async () => {
        const profilePic = loggedInUser.profilePic ? loggedInUser.profilePic : "default.jpg";
        try {
            const response = await fetch(`http://localhost:3001/notifications/create`, {
                method: "POST",
                headers: {'Content-Type':'application/json', Authorization:`Bearer ${token}`},
                body: JSON.stringify({ 
                    userId: user._id, 
                    type: "New follower", 
                    referenceId: loggedInUser._id, 
                    referenceUsername: loggedInUser.username, 
                    referenceProfilePic: profilePic
                })
            });
            const data = await response.json();
            console.log("Notification sent successfuly: ", data);
        } catch (err) {console.error('Error:', err);}
    }
    
    const handleFollow = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/${loggedInUser._id}/follow`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({followId: user._id})
            });
            if (response.ok) {
                await getUser();
                sendNotification();
            } else {
                console.error('Failed to follow/unfollow user');
            }
        } catch (err) {console.error('Error:', err);}
    }

    const handleRemoveFollower = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/${loggedInUser._id}/remove`, {
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

    const editProfile = async (formData) => {
        try {
            const response = await fetch(`http://localhost:3001/users/${loggedInUser._id}/edit`, {
                method: 'PATCH',
                headers: {'Authorization': `Bearer ${token}`},
                body: formData
            });
            if (response.ok) {
                const data = await response.json();
                const { username, bio, profilePic, firstName, lastName } = data.user;
                dispatch(setUsername({ username: username }));
                setUser((prevUser) => ({ ...prevUser, username, bio, profilePic, firstName, lastName }));
                postsWidgetRef.current.refreshPosts();
                navigate(`/profile/${username}`);
            } else {
                const errorData = await response.json();
                console.error('Failed to edit profile:', errorData.message);
                if (errorData.message.includes("duplicate")) {
                    handleOpenError("The username you selected is already in use.");
                }
            }
        } catch (err) {console.error('Error:', err);} 
    }

    useEffect(() => {
        getUser();
    }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

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
                            <Typography variant="h3" marginBottom="0.8rem" sx={{fontWeight: 700}}>
                                {user.username}
                            </Typography>
                            <Typography variant="h4">
                                {`${user.firstName} ${user.lastName}`}
                            </Typography>
                            <Typography mt="0.5rem" fontStyle="italic">
                                {user.bio ? user.bio : "No bio yet..."}
                            </Typography>
                            <Box marginTop="1rem" color="gray" display="flex" gap="1rem">
                                <Typography
                                    sx={{"&:hover":{cursor:"pointer"}}}
                                    onClick={() => {
                                        setType("followers");
                                        handleOpen();
                                    }}
                                >
                                    {user.followers.length} {user.followers.length === 1 ? "follower" : "followers"}
                                </Typography>
                                <Typography
                                    sx={{"&:hover":{cursor:"pointer"}}}
                                    onClick={() => {
                                        setType("following");
                                        handleOpen();
                                    }}
                                >
                                    {user.following.length} following
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <UserImage
                                image={user.profilePic ? user.profilePic : "default.jpg"}
                                size="120"
                            />
                        </Box>
                    </FlexBetween>
                    {loggedInUser._id === user._id ? (
                        <Box marginTop="1rem" display="flex" justifyContent="center">
                            <Button
                                onClick={handleOpenEdit}
                                sx={{width:"100%", border:"2px solid gray"}}
                            >
                                Edit profile
                            </Button>
                        </Box>
                    ): (
                        <Box marginTop="1rem" display="flex" justifyContent="center" gap="2rem">
                            <Button
                                variant="contained"
                                sx={{width:"100%", border:"2px solid gray", color:"white"}}
                                onClick={() => handleFollow()}
                            >
                                {user.followers.includes(loggedInUser._id) ? "Unfollow" : "Follow"}
                            </Button>
                            {user.following.includes(loggedInUser._id) && (
                                <Button
                                    variant="contained"
                                    sx={{width:"100%", border:"2px solid gray", color:"white"}}
                                    onClick={() => handleRemoveFollower()}
                                >
                                    Remove Follower
                                </Button>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
            <PostsWidget userId={user._id} isProfile ref={postsWidgetRef}/>
            <UserListModal
                user={user}
                setUser={setUser}
                open={open}
                handleClose={handleClose}
                type={type}
                userId={user._id}
            />
            <EditProfileModal 
                openEdit={openEdit} 
                handleCloseEdit={handleCloseEdit} 
                editProfile={editProfile}
                user={user}
            />
            <ErrorModal error={error} openError={openError} handleCloseError={handleCloseError}/>
        </Box>
    );
}
export default Profile;