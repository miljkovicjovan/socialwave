import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light", // Theme mode: "dark" or "light"
    user: null,  // Current user info
    token: null, // Authentication token
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Toggle between dark and light theme
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        // Set user and token on login
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        // Remove user and token on logout
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFollowing: (state, action) => {
            if (state.user) {
                state.user.following = action.payload.following;
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => { // TODO: understand how this works exactly
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            })
            state.posts = updatedPosts;
        }
    }
})

// Export actions for use in components
export const { setMode, setLogin, setLogout, setFollowing, setPosts, setPost } = authSlice.actions;
// Export the reducer to be used in the store
export default authSlice.reducer;