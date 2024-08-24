import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

const registerSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Please provide a valid email adress").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const initialValuesRegister = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = ({ isLogin, setIsLogin }) => {
    const [pageType, setPageType] = useState("login");
    const [error, setError] = useState(null);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const register = async (values, onSubmitProps) => {
        try {
            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
  
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
    
            const savedUser = await response.json();
            onSubmitProps.resetForm();
    
            if (savedUser) {
                setIsLogin(true);
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message);
        }
    };

    const login = async (values, onSubmitProps) => {
        try {
            const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!loggedInResponse.ok) {
                const errorData = await loggedInResponse.json();
                throw new Error(errorData.message || "Failed to Sign in, check your information.");
            }

            const loggedIn = await loggedInResponse.json();
            onSubmitProps.resetForm();
            if (loggedIn) {
                dispatch(
                    setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                    })
                );
                navigate("/home");
            } 
        } catch (error) {
            console.error(error);
            setError(error.message); // Set error state to display an error message
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) { 
            await login(values, onSubmitProps);
        } else {
            await register(values, onSubmitProps);
        }
    };

    return (
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
        >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
        }) => (
            <form onSubmit={handleSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >
                    {!isLogin && (
                        <>
                            <TextField
                                label="Username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                error={Boolean(touched.username) && Boolean(errors.username)}
                                helperText={touched.username && errors.username}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={
                                    Boolean(touched.firstName) && Boolean(errors.firstName)
                                }
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                            label="Last Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            name="lastName"
                            error={
                                Boolean(touched.lastName) && Boolean(errors.lastName)
                            }
                            helperText={touched.lastName && errors.lastName}
                            sx={{ gridColumn: "span 2" }}
                            />
                        </>
                    )}

                    <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                    />
                </Box>

                {/* BUTTONS */}
                <Box>
                    <Button
                    fullWidth
                    type="submit"
                    sx={{
                        m: "2rem 0",
                        p: "1rem",
                        backgroundColor: palette.primary.main,
                        color: palette.background.alt,
                        "&:hover": { color: palette.primary.main },
                    }}
                    >
                    {isLogin ? "LOGIN" : "REGISTER"}
                    </Button>
                    <Typography>
                        {isLogin ? "New to SocialWave? " : "Already have an account? "}
                        <Typography
                            component="span"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                resetForm();
                            }}
                            sx={{
                            textDecoration: "underline",
                            color: palette.primary.main,
                            "&:hover": {
                                cursor: "pointer",
                                color: palette.primary.light,
                            },
                            }}
                        >
                            {isLogin ? "Create an account" : "Sign in"}
                        </Typography>
                    </Typography>
                </Box>
                {/* Error message */}
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                    </Typography>
                )}
            </form>
        )}
    </Formik>
  );
};

export default Form;