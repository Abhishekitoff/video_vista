import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: true,
    video:[],
    category:"all",
    searchSuggestion:[]
  }
  
  export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleSidebar:(state)=>{
            state.value =!state.value
        },

        setHomeVideo:(state,action)=>{
          state.video =action.payload;
        },

        setCategory:(state, action)=>{
          state.category = action.payload
        },
        setsearchSuggestion:(state, action)=>{
          state.searchSuggestion = action.payload
        }
     
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { toggleSidebar ,setHomeVideo, setCategory, setsearchSuggestion} = appSlice.actions
  
  export default appSlice.reducer