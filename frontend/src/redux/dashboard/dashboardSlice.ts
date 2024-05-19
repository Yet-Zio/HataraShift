import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    option: SideOptions
}

const initialState: InitialState = {
    option: "Home"
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        change: (state, action) => {
            state.option = action.payload
        }
    }
})

export default dashboardSlice.reducer
export const { change } = dashboardSlice.actions