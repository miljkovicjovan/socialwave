import React, { useState } from 'react';
import { Box, IconButton, Modal, Typography, TextField, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const PostModal = ({ open, handleClose, createPost }) => {
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        // Call the createPost function passed down as a prop
        await createPost(description);
        // Clear the text field
        setDescription("");
        // Close the modal
        handleClose();
    };

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
                <Typography variant="h6" component="h2">
                    Create a Post
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="What's on your mind?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    Post
                </Button>
            </Box>
        </Modal>
    );
};

export default PostModal;
