import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { userPermittedActions } from "../backend/userPermittedActions"
import { RTKQ_TAGS } from "../util/rtkqTags"

const allWorkoutsBaseQuery = () =>
    async () => {
        try {
            const data = await userPermittedActions.getUserWorkouts()
            return { data }
        } catch (error) {
            throw new Error(error)
        }
    }

export const workoutsApi = createApi({
    reducerPath: 'workoutsApi',
    baseQuery: allWorkoutsBaseQuery(),
    tagTypes: [RTKQ_TAGS.WORKOUTS, RTKQ_TAGS.FILTERED_WORKOUTS],
    endpoints: (builder) => ({
        getAllWorkouts: builder.query({
            query: () => allWorkoutsBaseQuery(),
            providesTags: [RTKQ_TAGS.WORKOUTS]
        }),
        filter: builder.query({
            queryFn: (filteredWorkout) => ({ data: userPermittedActions.getMatchingWorkouts(filteredWorkout) }),
            providesTags: [RTKQ_TAGS.FILTERED_WORKOUTS]
        }),
        filterViaDate: builder.mutation({
            queryFn: (filterDate) => ({ data: userPermittedActions.getMatchingWorkouts(filterDate) }),
            invalidatesTags: [RTKQ_TAGS.FILTERED_WORKOUTS]
        }),
        getWorkoutById: builder.query({
            queryFn: (id) => ({ data: userPermittedActions.getWorkout(Number(id)) }),
            providesTags: [RTKQ_TAGS.WORKOUTS]
        }),
        updateWorkout: builder.mutation({
            queryFn: (updatedWorkoutData) => ({ data: userPermittedActions.updateWorkout(updatedWorkoutData) }),
            invalidatesTags: [RTKQ_TAGS.WORKOUTS]
        }),
        createWorkout: builder.mutation({
            queryFn: (newWorkoutData) => ({ data: userPermittedActions.createWorkout(newWorkoutData) }),
            invalidatesTags: [RTKQ_TAGS.WORKOUTS]
        }),
        deleteWorkout: builder.mutation({
            queryFn: (id) => ({ data: userPermittedActions.deleteWorkoutById(id) }),
            invalidatesTags: [RTKQ_TAGS.WORKOUTS]
        })
    })
})

export const {
    useGetAllWorkoutsQuery,
    useFilterQuery,
    useFilterViaDateMutation,
    useGetWorkoutByIdQuery,
    useUpdateWorkoutMutation,
    useCreateWorkoutMutation,
    useDeleteWorkoutMutation
} = workoutsApi