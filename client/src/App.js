import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import Home from "components/scenes/home";
import Profile from "components/scenes/profile";
import Login from "components/scenes/login";

function App() {
	// get the current mode state from redux
	const mode = useSelector((state) => state.mode);

	// make memoized theme object based on the current mode
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	// check if user is authorized
	const isAuth = Boolean(useSelector((state) => state.token));

	return <div className="app">
		{/* Router for handling navigation */}
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline /> {/* Normalize CSS */}
				<Routes>
					<Route 
						path="/" 
						element={isAuth ? <Home/> : <Login/>}
					/>
					<Route
						path="/home"
						element={isAuth ? <Home/> : <Navigate to="/"/>}
					/>
					<Route
						path="/profile/:username"
						element={isAuth ? <Profile/> : <Navigate to="/"/>}
					/>
					{/* Redirect to Login if no route matches */}
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	</div>;
}

export default App;