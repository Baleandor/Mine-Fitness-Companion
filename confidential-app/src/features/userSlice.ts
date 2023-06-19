import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export interface userState {
    user: null,
    accessToken: null
}

const initialState: userState = {
    user: null,
    accessToken: null
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async () => {

    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.accessToken = accessToken
        },
        logout: (state) => {
            state.user = null
            state.accessToken = null
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer