import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserDataType, authService } from '../backend/userAuth'


export type UserStateType = {
    userEmail: string | null
}

const initialState: UserStateType = {
    userEmail: null
}

export const registerUser = createAsyncThunk('auth/register', async (user: UserDataType, thunkAPI) => {
    try {
        return authService.register(user)
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
            userEmail: (state, action) => {
            state.userEmail = action.payload
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(registerUser.fulfilled, (state, action) => {
    //             state.userId = action.payload
    //         })
    //         .addCase(registerUser.rejected, (state) => {
    //             state.userId = null
    //         })
    //         .addCase(loginUser.fulfilled, (state) => {
    //             state.userId = getUser()
    //         })
    //         .addCase(loginUser.rejected, (state) => {
    //             state.userId = null
    //         })
    // }
})

export const {  userEmail } = authSlice.actions

export default authSlice.reducer