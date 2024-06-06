import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import chartsColorReducer from  './slices/chartsColorSlice'

export const store = configureStore({
   reducer: {
       user: userReducer,
       chartsColor: chartsColorReducer,
   }
});