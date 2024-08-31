import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, IconButton, Modal, Typography, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';

const UserListModal = ({ user, setUser, open, handleClose, type, userId }) => {

    const token = useSelector((state) => state.token);

    const { username } = useParams();
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${username}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    const handleUnfollow = async (selectedId) => {
        try {
            const response = await fetch(`http://localhost:3001/users/${user._id}/follow`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({followId: selectedId})
            });
            if (response.ok) {
                getUser();
            } else {
                console.error('Failed to follow/unfollow user');
            }
        } catch (err) {console.error('Error:', err);}
    }

    const handleRemoveFollower = async (selectedId) => {
        try {
            const response = await fetch(`http://localhost:3001/users/${user._id}/remove`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({followerId: selectedId})
            });
            if (response.ok) {
                getUser();
            } else {
                console.error('Failed to remove follower');
            }
        } catch (err) {console.error('Error:', err);}
    }

    const [list, setList] = useState([]);

    const fetchFollowers = async () => {
        try {
            const response = await fetch('http://localhost:3001/users/batch', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userIds: user.followers }),
            });

            if (response.ok) {
                const users = await response.json();
                setList(users);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchFollowing = async () => {
        try {
            const response = await fetch('http://localhost:3001/users/batch', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userIds: user.following }),
            });

            if (response.ok) {
                const users = await response.json();
                setList(users);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        if (open) {
            if (type === "followers") fetchFollowers();
            if (type === "following") fetchFollowing();
        }
    }, [open, user.following, user.followers]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '400px',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "10px",
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h5" component="h2" mb="1rem">
                    {type === "followers" ? "Followers" : "Following"}
                </Typography>
                {list.map(
                    ({
                        _id,
                        username, 
                        profilePic
                    }) => (
                        <FlexBetween key={_id} margin="0.5rem 0">
                            <Box display="flex" alignItems="center">
                                <UserImage image={profilePic === "" ? "default.jpg" : profilePic} size="30px"/>
                                <Typography ml="0.5rem">{username}</Typography>
                            </Box>
                            {user._id === userId && (
                                <Box>
                                    {type === "following" ? (
                                        <Button 
                                            color="error"
                                            onClick={() => handleUnfollow(_id)}
                                        >
                                            Unfollow
                                        </Button>
                                    ):(
                                        <Button
                                            color="error"
                                            onClick={() => handleRemoveFollower(_id)}
                                        >
                                            Remove Follower
                                        </Button>
                                    )}
                                </Box>
                            )}
                        </FlexBetween>
                    )
                )}
            </Box>
        </Modal>
    );
};

export default UserListModal;
