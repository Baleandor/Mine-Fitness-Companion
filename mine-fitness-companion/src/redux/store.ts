import { configureStore } from '@reduxjs/toolkit'
import { measureApi } from './measurementsApi'
import { exercisesApi } from './exerciseApi'
import { workoutsApi } from './workoutsApi'
import { userApi } from './userApi'
import { basicInfoApi } from './basicInfoApi'
import isUserLoggedInReducer from './isUserLoggedIn'


export const store = configureStore({
    reducer: {
        isLoggedIn: isUserLoggedInReducer,
        [measureApi.reducerPath]: measureApi.reducer,
        [basicInfoApi.reducerPath]: basicInfoApi.reducer,
        [workoutsApi.reducerPath]: workoutsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [exercisesApi.reducerPath]: exercisesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        measureApi.middleware,
        basicInfoApi.middleware,
        workoutsApi.middleware,
        userApi.middleware,
        exercisesApi.middleware
    ]),


})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch