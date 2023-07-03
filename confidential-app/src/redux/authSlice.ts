import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserRegisterDataType, authService } from '../api/userAuth'


const user = JSON.parse(localStorage.getItem('user'))

export type UserStateType = {
    value: {
        user: string | null,
        isError: boolean,
        isSuccess: boolean,
        isLoading: boolean,
        message: string
    }
}

const initialStateValue = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

const initialState: UserStateType = {
    value: initialStateValue
}

export const registerUser = createAsyncThunk('auth/register', async (user: UserRegisterDataType, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const loginUser = createAsyncThunk('auth/login', async (user: UserRegisterDataType, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.value.isError = false
            state.value.isLoading = false
            state.value.isSuccess = false
            state.value.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.value.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.value.isLoading = false
                state.value.isSuccess = true
                state.value.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.value.isLoading = false
                state.value.isError = true
                state.value.message = action.payload
                state.value.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.value.user = null
            })
            .addCase(loginUser.pending, (state) => {
                state.value.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.value.isLoading = false
                state.value.isSuccess = true
                state.value.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.value.isLoading = false
                state.value.isError = true
                state.value.message = action.payload
                state.value.user = null
            })

    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer