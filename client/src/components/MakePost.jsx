import React, { useState } from 'react';
import { Box, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import PostModal from './PostModal';
import { useSelector } from 'react-redux';

const MakePost = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const createPost = async (description) => {
        try {
            const userId = user._id;
            const response = await fetch('http://localhost:3001/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId,
                    description
                }),
            });

            console.log("hh")
            if (response.ok) {
                const newPost = await response.json();
                console.log('Post created successfully');
                user.posts = [...user.posts, newPost];
            } else {
                console.log(response);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <>
            <Box
                sx={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                }}
            >
                <IconButton
                    color="white"
                    onClick={handleOpen}
                    sx={{
                        borderRadius: "10px",
                        backgroundColor: "gray",
                        "&:hover": {
                            backgroundColor: "gray",
                            cursor: "pointer",
                        },
                    }}
                >
                    <AddIcon 
                        sx={{
                            fontSize: "3rem"
                        }}
                    />
                </IconButton>
            </Box>
            
            {/* Pass the createPost function to PostModal */}
            <PostModal open={open} handleClose={handleClose} createPost={createPost} />
        </>
    );
};

export default MakePost;
