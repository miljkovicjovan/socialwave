import { useState } from "react";

import { Modal, Typography, IconButton, Box, TextField, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { useDropzone } from 'react-dropzone';

const EditProfileModal = ({ user, openEdit, handleCloseEdit, editProfile}) => {
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [bio, setBio] = useState(user.bio);
    const [image, setImage] = useState(null);

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

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('bio', bio);
        if (image) {
            formData.append('image', image);
            formData.append('profilePic', image.name);
        }
        await editProfile(formData);

        handleClose();
    };

    const handleClose = async () => {
        // reset to default
        setUsername(user.username);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setImage(null)
        setBio(user.bio);

        handleCloseEdit();
    }

    return ( 
        <Modal
            open={openEdit}
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
                <Typography variant="h3" component="h3">
                    Edit your profile
                </Typography>
                <Box>
                    <Box mt="2rem">
                        <TextField
                            variant="outlined"
                            label="Username:"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{paddingRight: "5rem"}}
                        />
                        <TextField
                            variant="outlined"
                            label="First name:"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            sx={{paddingRight: "1.5rem"}}
                        />
                        <TextField
                            variant="outlined"
                            label="Last name:"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Box>
                    <Box
                        {...getRootProps()}
                        mt="2rem"
                        sx={{
                            p: 5,
                            border: '2px dashed gray',
                            borderRadius: '10px',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <input {...getInputProps()} />
                        <Typography>Drag an image here, or click to select one.</Typography>
                    </Box>
                    {/* Preview selected or existing image */}
                    {image && (
                        <Box sx={{ mt: 2 }}>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                style={{ maxWidth: '100%', borderRadius: '10px' }}
                            />
                        </Box>
                    )}
                    <TextField
                        sx={{marginTop:"2rem"}}
                        variant="outlined"
                        label="Bio:"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        fullWidth
                        multiline
                    />
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    Submit changes
                </Button>
            </Box>
        </Modal>
    );
}
export default EditProfileModal;