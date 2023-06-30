import { createSlice } from '@reduxjs/toolkit'


export type userStateType = {
    value: { name: string, email: string }
}


const initialStateValue = { name: '', email: '' }

const initialState: userStateType = {
    value: initialStateValue
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const { name, email } = action.payload
            state.value.name = name
            state.value.email = email
        },
        logout: (state) => {
            state.value = initialStateValue
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer