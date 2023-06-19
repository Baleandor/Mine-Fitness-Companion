import { createSlice } from '@reduxjs/toolkit'


export type userStateType = {
    value: { name: string, email: string }
}


const initialStateValue = { name: '', email: '' }

const initialState: userStateType = {
    value: initialStateValue
}

//TODO ask about the async thunk login
// export const loginUser = createAsyncThunk(
//     'user/loginUser',
//     async (data) => {
//         //This is where axios or RTK query would go. Can't implement, for now, with how mock BE is setup.
//         localStorage.setItem('user', JSON.stringify(data))
//     }
// )

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const { name, email } = action.payload
            state.value.name = name
            state.value.email = email
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.value = initialStateValue
            localStorage.clear()
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer