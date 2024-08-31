import {Box, IconButton, Modal, Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "state";

const PostOptionsModal = ({
    postId,
    open, 
    setOpen
}) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    const handleOptionsClose = () => setOpen(false);
    
    const handleEdit = () => console.log("editing");
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/posts/${postId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                dispatch(deletePost({postId: postId})); 
            } else {
                console.error('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

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
                        color="primary" 
                        sx={{width:"100%", border:"2px solid gray"}}
                        onClick={handleEdit}
                    >
                        Edit post
                    </Button>
                    <Button
                        color="error" 
                        sx={{width:"100%", border:"2px solid gray"}}
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