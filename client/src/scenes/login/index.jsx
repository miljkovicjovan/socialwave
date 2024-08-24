import { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import CenteredBox from "components/CenteredBox";
import Form from "./Form";

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
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
    );
};

export default LoginPage;