/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    tasks: [], 
  };
const taskSlice =createSlice({
    name:'tasks',
    initialState,
    reducers:{
        addTask:(state, action)=>{
            state.tasks.push(action.payload);
        },

        updateTask:(state,action)=>{
            const index =state.tasks.findIndex(task=>task.id === action.payload.id);
            if(index !== -1){ //if it is found
                state.tasks[index]={...state.tasks[index],...action.payload};
            }
        },

        deleteTask:(state,action)=>{
            const index =state.tasks.findIndex(task=>task.id === action.payload.id);
            if(index !== -1){ 
                state.tasks=state.tasks.filter(task=> task.id !== action.payload.id);
            }
        },
    }
    
});

export const {addTask, updateTask,deleteTask} =taskSlice.actions;
export default taskSlice.reducer;