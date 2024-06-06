import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    color: 'rgb(191, 191, 191)'
};

const chartsColorSlice = createSlice({
    name: 'chartsColor',
    initialState,
    reducers: {
        setColor(state, action) {
            Object.assign(state, action.payload);
        },
    },
});

export const {setColor} = chartsColorSlice.actions;

export default chartsColorSlice.reducer;