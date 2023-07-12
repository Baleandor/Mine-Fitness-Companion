import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserDataType, authService } from '../api/userAuth'


export type UserStateType = {
    user: UserDataType | null | any
}


const initialState: UserStateType = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

export const registerUser = createAsyncThunk('auth/register', async (user: UserDataType, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// export const loginUser = createAsyncThunk('auth/login', async (user: { email: string; password: string }, thunkAPI) => {
//     try {
//         return authService.login(user)
//     } catch (error: any) {
//         const message =
//             (error.response &&
//                 error.response.data &&
//                 error.response.data.message) ||
//             error.message ||
//             error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            authService.login(action.payload)
        },
        logout: (state) => {
            state.user = null
            authService.logout()
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state) => {
                state.user = null
            })
    }
})

export const { logout, login } = authSlice.actions

export default authSlice.reducer