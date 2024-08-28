import React, { useState } from 'react';
import { Box, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import PostModal from './PostModal';
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MakePost = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const createPost = async (formData) => {
        try {
            formData.append("userId", user._id);
            const response = await fetch('http://localhost:3001/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const posts = await response.json();
                dispatch(setPosts({ posts }));
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
