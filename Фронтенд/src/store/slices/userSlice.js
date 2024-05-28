import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    token: null,
    id: null,
    fullName: null,
    isAuthenticated: false,
    role: 'unauthorized'
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            Object.assign(state, action.payload);
        },
        setAuthenticated(state) {
            state.isAuthenticated = true;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            state.fullName = null;
            state.isAuthenticated = false;
            state.role = 'unauthorized'
        }
    },
});

export const {setUser, setAuthenticated, removeUser} = userSlice.actions;

export default userSlice.reducer;