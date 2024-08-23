import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from 'scenes/home';
import Profile from "scenes/profile";
import Login from "scenes/login";
import Nav from "scenes/nav";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  // get the current mode state from redux
  const mode = useSelector((state) => state.mode);

  // make memoized theme object based on the current mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return <div className="app">
    {/* Router for handling navigation */}
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Normalize CSS */}
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile/:userId" element={<Profile/>}/>
          {/* Redirect to Login if no route matches */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>;
}

export default App;