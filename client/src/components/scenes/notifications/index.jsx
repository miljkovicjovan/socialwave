import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Typography, useMediaQuery} from "@mui/material";
import { formatDistanceToNow } from 'date-fns';

import FlexBetween from "components/FlexBetween";
import Nav from "../nav";
import UserImage from "components/UserImage";

const Notifications = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const user = useSelector((state) => state.user);
    const userId = user._id;
    const token = useSelector((state) => state.token);

    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    const getNotifications = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/notifications/`,
                {
                    method: "POST",
                    headers: {'Content-Type':'application/json', Authorization:`Bearer ${token}`},
                    body: JSON.stringify({ userId: userId }),
                }
            );
            const data = await response.json();
            setNotifications(data);
        } catch (err) {console.error('Error:', err);}
    };

    const handleClick = (profile) => {
        navigate("/profile/"+profile);
    };

    useEffect(() => {
        getNotifications();
    }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box>
            <Nav/>
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                padding="2rem"
                m="0 auto"
            >
                <Typography textAlign="center" variant="h3" pb="1rem">Notifications</Typography>
                <Box
                    sx={{
                        position: 'relative',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: "10px",
                        border: "2px solid gray"
                    }}
                >
                    {notifications.length === 0 ? 
                        <Typography padding="1rem">
                            No notifications yet. Go interact with the community and come back :)
                        </Typography> :
                        notifications.map(
                            ({
                                _id,
                                type,
                                referenceUsername,
                                referenceProfilePic,
                                createdAt
                            }, index) => (
                                <Box key={_id}>
                                    <FlexBetween
                                        margin="0.5rem 0"
                                        padding="1rem"
                                        onClick={() => handleClick(referenceUsername)}
                                        sx={{"&:hover":{cursor: "pointer"}}}
                                    >
                                        <Box display="flex" alignItems="center">
                                            <UserImage 
                                                image={referenceProfilePic
                                                    ? referenceProfilePic
                                                    : "default.jpg"}
                                                size="35px"
                                            />
                                            <Box ml="0.5rem">
                                                <FlexBetween>
                                                    <Typography mr="0.5rem">{referenceUsername}</Typography>
                                                    <Typography color="gray">
                                                        {formatDistanceToNow(new Date(createdAt),{addSuffix:true})}
                                                    </Typography>
                                                </FlexBetween>
                                                <Typography variant="h5">{type}</Typography>
                                            </Box>
                                        </Box>
                                    </FlexBetween>
                                    {index < notifications.length - 1 && <hr color="gray"/>}
                                </Box>
                            )
                        )
                    }
                </Box>
            </Box>
        </Box>
    );
}
export default Notifications;