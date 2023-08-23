import { createSlice } from "@reduxjs/toolkit"


export type UserStateType = boolean

const initialState: UserStateType = Boolean(localStorage.getItem('sb-quydiknawtvporagkwoj-auth-token'))


export const userLoggedInSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        isLoggedIn: state => state = true,

        isLoggedOut: state => state = false,

    }
})


export const { isLoggedIn, isLoggedOut } = userLoggedInSlice.actions

export default userLoggedInSlice.reducer