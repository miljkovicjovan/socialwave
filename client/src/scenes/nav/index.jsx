import { useState } from "react";
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
import { LightMode, DarkMode, Menu, Close, Waves } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Nav = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    // for testing purpose uncomment the bellow and comment the above
    //const user = "1";
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;

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
            <FlexBetween gap="1.75rem">
                <IconButton
                    color="white"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                >
                    <Waves/>
                </IconButton>
            </FlexBetween>

            {/* DESKTOP NAV */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
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
                                onClick={() => navigate("/profile/"+user.username)}
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
                        <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>
                            {theme.palette.mode === "dark" ? 
                                (<DarkMode sx={{ fontSize: "25px" }} />) : 
                                ( <LightMode sx={{ color: dark, fontSize: "25px" }} />)
                            }
                        </IconButton>
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
                                    onClick={() => navigate("/profile/"+user.username)}
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
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};
export default Nav;