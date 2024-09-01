import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";
import { LightMode, DarkMode, Menu, Close, Waves,
    NotificationsNone, Notifications,
    HomeOutlined, Home,
    PersonOutlineOutlined, Person } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Nav = ({ setUser }) => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const [icon, setIcon] = useState();
  
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;

    const handleProfileNavigation = () => {
        navigate(`/profile/${user.username}`);
        // Check if the current path matches /profile/something
        if (location.pathname.startsWith('/profile/')) {
            setUser(user);
        }
    };

    useEffect(() => {
        if (location.pathname.includes("profile")) {
            setIcon("profile");
        } else if (location.pathname.includes("home") || location.pathname === "/") {
            setIcon("home");
        } else if (location.pathname.includes("notifications")) {
            setIcon("notifications");
        }
    }, [location.pathname]);

    return (
        <FlexBetween 
            padding="1rem 6%"
            sx={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                backgroundColor: background
            }}
        >
            <Typography 
                display="flex"
                alignItems="center"
                onClick={() => navigate("/home")}
                sx={{
                    "&:hover": {
                        cursor: "pointer",
                    },
                }}
            >
                <IconButton
                    color="white"
                >
                    <Waves/>
                </IconButton>
                SocialWave
            </Typography>

            {/* DESKTOP NAV */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <FlexBetween gap="1rem">
                        <IconButton onClick={() => navigate("/")} color="white">
                            {icon === "home" ? <Home/> : <HomeOutlined/>}
                        </IconButton>
                        <IconButton onClick={() => navigate(`/profile/${user.username}`)} color="white">
                            {icon === "profile" ? <Person/> : <PersonOutlineOutlined/>}
                        </IconButton>
                        <IconButton onClick={() => navigate("/notifications")} color="white">
                            {icon === "notifications" ? <Notifications/> : <NotificationsNone/>}
                        </IconButton>
                    </FlexBetween>
                    <FormControl variant="standard" value={user.username}>
                        <Select
                            value={user.username}
                            sx={{
                                backgroundColor: neutralLight,
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight,
                                },
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem 
                                value={user.username}
                                onClick={handleProfileNavigation}
                            >
                                <Typography>{user.username}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu />
                </IconButton>
            )}

            {/* MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    {/* CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="3rem"
                    >
                        <Box display="flex" flexDirection="column">
                            <IconButton onClick={() => navigate("/")}
                                sx={{padding:"0.8rem", borderRadius:"10px"}} color="white">
                                {icon === "home" ? <Home/> : <HomeOutlined/>}
                                <Typography pl="0.3rem">Home</Typography>
                            </IconButton>
                            <IconButton onClick={() => navigate(`/profile/${user.username}`)}
                                sx={{padding:"0.8rem", borderRadius:"10px"}} color="white">
                                {icon === "profile" ? <Person/> : <PersonOutlineOutlined/>}
                                <Typography pl="0.3rem">Profile</Typography>
                            </IconButton>
                            <IconButton 
                                onClick={() => navigate("/notifications")}
                                sx={{padding:"0.8rem", borderRadius:"10px"}} color="white">
                                {icon === "notifications" ? <Notifications/> : <NotificationsNone/>}
                                <Typography pl="0.3rem">Notifications</Typography>
                            </IconButton>
                        </Box>
                        <FormControl variant="standard" value={user.username}>
                            <Select
                            value={user.username}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight,
                                },
                            }}
                            input={<InputBase />}
                            >
                                <MenuItem 
                                    value={user.username}
                                    onClick={handleProfileNavigation}
                                >
                                    <Typography>{user.username}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    dispatch(setLogout());
                                }}>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>
                            {theme.palette.mode === "dark" ? 
                                (<DarkMode sx={{ fontSize: "25px" }} />) : 
                                ( <LightMode sx={{ color: dark, fontSize: "25px" }} />)
                            }
                        </IconButton>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};
export default Nav;