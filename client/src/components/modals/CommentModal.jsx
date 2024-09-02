import { useState } from "react";

import { Modal, Box, IconButton, Typography, TextField, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const CommentModal = ({ open, handleClose, createComment }) => {
    const [comment, setComment] = useState();

    const handleSubmit = async () => {
        createComment(comment);
        // Clear the states
        setComment("");
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
                <Typography variant="h5" component="h2">
                    Add a comment
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="What's on your mind?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{mt: 2}}
                    multiline
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    Comment
                </Button>
            </Box>
        </Modal>
    );
}
 
export default CommentModal;