import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    start: false, 
    success: false, 
    done: false, 
    submitres: "",
    message: ""
}

const shiftSubmitSlice = createSlice({
    name: 'shiftSubmit',
    initialState,
    reducers: {
        changesubmit: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export default shiftSubmitSlice.reducer
export const { changesubmit } = shiftSubmitSlice.actions