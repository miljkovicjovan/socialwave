import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMode } from "state";

import { Box, Typography, useTheme, useMediaQuery, IconButton } from "@mui/material";
import { LightMode, DarkMode, Waves} from "@mui/icons-material";

import CenteredBox from "components/CenteredBox";
import Form from "./Form";
import FlexBetween from "components/FlexBetween";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);

    // theme / style settings
    const theme = useTheme();
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return (
        <Box>
            <FlexBetween
                padding="1rem 6% 0 6%"
                sx={{ position: "sticky", top: 0, zIndex: 1000, backgroundColor: background }}
            >
                <Typography 
                    display="flex"
                    alignItems="center"
                    onClick={() => navigate("/home")}
                    sx={{"&:hover": { cursor: "pointer" }}}
                >
                    <IconButton color="white"><Waves/></IconButton>
                    SocialWave
                </Typography>
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                </IconButton>
            </FlexBetween>
            <CenteredBox width={isNonMobileScreens ? "40%" : "93%"} m="auto">
                <Box
                    p="2rem"
                    borderRadius="1.5rem"
                    backgroundColor={theme.palette.background.alt}
                >
                    <Typography fontWeight="700" variant="h6" sx={{ mb: "1.5rem" }}>
                        {isLogin ?
                            <>Welcome back!<br/>Sign in with your SocialWave account</> : 
                            <>Welcome to SocialWave!<br/>Let's begin the adventure</>
                        }
                    </Typography>
                    <Form isLogin={isLogin} setIsLogin={setIsLogin} />
                </Box>
            </CenteredBox>
        </Box>
    );
};

export default Login;