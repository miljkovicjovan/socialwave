import {Box, IconButton, Modal, Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const PostOptionsModal = ({
    open, 
    setOpen
}) => {

    const handleOptionsClose = () => setOpen(false);
    
    const handleEdit = () => console.log("editing");
    const handleDelete = () => console.log("deleting");

    return (
        <Modal 
            open={open} 
            onClose={handleOptionsClose}
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
                <
                    IconButton
                    onClick={handleOptionsClose}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}} gap="1rem">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleEdit}
                    >
                        Edit post
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={handleDelete}
                    >
                        Delete post
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default PostOptionsModal;