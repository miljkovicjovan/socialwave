import { useState } from 'react';

import { Box, IconButton, Modal, Typography, TextField, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { useDropzone } from 'react-dropzone';

const PostModal = ({ open, handleClose, createPost }) => {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
            formData.append('imagePath', image.name);
        }

        await createPost(formData);
        // Clear the states
        setDescription("");
        setImage(null);
        handleClose();
    };

    const onDrop = (acceptedFiles) => {
        // Only allow one image, replace any existing image
        if (acceptedFiles.length > 0) {
            setImage(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
        },
        onDrop,
        maxFiles: 1
    });

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
                    Create new post
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="What's on your mind?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{mt: 2}}
                    multiline
                />
                <Box
                    {...getRootProps()}
                    sx={{
                        mt: 2,
                        p: 2,
                        border: '2px dashed gray',
                        borderRadius: '10px',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <input {...getInputProps()} />
                    <Typography>Drag an image here, or click to select one.</Typography>
                </Box>

                {/* Preview selected image */}
                {image && (
                    <Box sx={{ mt: 2 }}>
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            style={{ maxWidth: '100%', borderRadius: '10px' }}
                        />
                    </Box>
                )}
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
