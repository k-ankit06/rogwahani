import { createSlice } from "@reduxjs/toolkit";

const storedAuth = JSON.parse(localStorage.getItem("auth")) || {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: storedAuth,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user; // User object must contain "role"
            state.token = action.payload.token;
            localStorage.setItem("auth", JSON.stringify(state)); // Save to localStorage
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("auth");
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
