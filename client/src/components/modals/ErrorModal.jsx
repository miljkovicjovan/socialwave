import { Modal, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ErrorModal = ({ error, openError, handleCloseError }) => {
    return ( 
        <Modal
            open={openError}
            onClose={handleCloseError}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                    onClick={handleCloseError}
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h5" component="h2">
                    {error}
                </Typography>
            </Box>
        </Modal>
    );
}
export default ErrorModal;