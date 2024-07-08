import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:0
    },
    reducers:{
        User:(state,action)=>{
            state.user= action.payload;
        }
    }
});

export const {User} = authSlice.actions;

export default authSlice.reducer;