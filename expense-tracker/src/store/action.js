import { createSlice } from "@reduxjs/toolkit";

const initialState={isDark:false, isLight:true}

const actionSlice=createSlice({
    name: 'action',
    initialState,
    reducers: {
        darkMode:(state)=>{
            state.isDark=!state.darkMode;;
        },
        lightMode:(state)=>{
           state.isLight=!state.isLight;
        }
    }
});


export const {darkMode,lightMode}=actionSlice.actions;
export default actionSlice.reducer;
