import { useState, useEffect } from "react";

import { Modal, Typography, IconButton, Box, TextField, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { useDropzone } from 'react-dropzone';

const EditProfileModal = ({ user, openEdit, handleCloseEdit, editProfile}) => {
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [bio, setBio] = useState(user.bio);
    const [image, setImage] = useState(null);

    // Separate error and helper text states for each field
    const [usernameError, setUsernameError] = useState(false);
    const [usernameHelperText, setUsernameHelperText] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [firstNameHelperText, setFirstNameHelperText] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    const [lastNameHelperText, setLastNameHelperText] = useState('');
    const [bioError, setBioError] = useState(false);
    const [bioHelperText, setBioHelperText] = useState('');

    // Derived state to disable submit button if any errors exist
    const isSubmitDisabled = usernameError || firstNameError || lastNameError || bioError;

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

        // reset errors and helper texts
        setUsernameError(false);
        setUsernameHelperText('');
        setFirstNameError(false);
        setFirstNameHelperText('');
        setLastNameError(false);
        setLastNameHelperText('');
        setBioError(false);
        setBioHelperText('');

        handleCloseEdit();
    }

    const handleChange = (event, type, min, max) => {
        const value = event.target.value;
        let error = false;
        let helperText = '';

        if (value.length < min) {
            error = true;
            helperText = `Minimum length is ${min} characters`;
        } else if (value.length > max) {
            error = true;
            helperText = `Maximum length is ${max} characters`;
        }

        if (type === "username") {
            setUsername(value);
            setUsernameError(error);
            setUsernameHelperText(helperText);
        } else if (type === "first") {
            setFirstName(value);
            setFirstNameError(error);
            setFirstNameHelperText(helperText);
        } else if (type === "last") {
            setLastName(value);
            setLastNameError(error);
            setLastNameHelperText(helperText);
        } else if (type === "bio") {
            setBio(value);
            setBioError(error);
            setBioHelperText(helperText);
        }
    };
    
    useEffect(() => {
        if (openEdit) {
            // Update state with the latest user data each time the modal opens
            setUsername(user.username);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setBio(user.bio);
            setImage(null);
        }
    }, [openEdit, user]);

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
                            onChange={(e) => handleChange(e, "username", 4, 15)}
                            sx={{paddingRight: "5rem"}}
                            error={usernameError}
                            helperText={usernameHelperText}
                        />
                        <TextField
                            variant="outlined"
                            label="First name:"
                            value={firstName}
                            onChange={(e) => handleChange(e, "first", 2, 50)}
                            sx={{paddingRight: "1.5rem"}}
                            error={firstNameError}
                            helperText={firstNameHelperText}
                        />
                        <TextField
                            variant="outlined"
                            label="Last name:"
                            value={lastName}
                            onChange={(e) => handleChange(e, "last", 2, 50)}
                            error={lastNameError}
                            helperText={lastNameHelperText}
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
                        onChange={(e) => handleChange(e, "bio", 2, 50)}
                        fullWidth
                        multiline
                        error={bioError}
                        helperText={bioHelperText}
                    />
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                    disabled={isSubmitDisabled}
                >
                    Submit changes
                </Button>
            </Box>
        </Modal>
    );
}
export default EditProfileModal;