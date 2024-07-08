import { createSlice } from "@reduxjs/toolkit";
const dataSlice=createSlice({
    name:"data",
    initialState:{
        correct_answer:null,
        missed_question:null,
        wrong_answer:null,
        scribbled_note:'',
        test_category:'',
        time_taken:0
    },
    reducers:{
        correctAnswer:(state,action)=>{
            state.correct_answer=action.payload
        },
        missedQuestion:(state,action)=>{
            state.missed_question=action.payload
        },
        wrongAnswer:(state,action)=>{
            state.wrong_answer=action.payload
        },
        scribbledNote:(state,action)=>{
            state.scribbled_note=action.payload
        },
        testCategory:(state,action)=>{
            state.test_category=action.payload
        },
        timeTaken:(state,action)=>{
            state.time_taken=action.payload
        }
    }
});

export const{correctAnswer,missedQuestion,wrongAnswer,scribbledNote,testCategory,timeTaken}=dataSlice.actions;
export default dataSlice.reducer;