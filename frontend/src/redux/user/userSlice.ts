import { createSlice } from "@reduxjs/toolkit";

type UserType = {
    success: boolean,
    _id: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

const initialState: { currentUser: UserType | null } = {
    currentUser: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
        },
    }
})

export default userSlice.reducer
export const { login, logout } = userSlice.actions