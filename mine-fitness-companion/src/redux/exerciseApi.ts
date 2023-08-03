import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { userPermittedActions } from "../backend/userPermittedActions"
import { RTKQ_TAGS } from "../util/rtkqTags"

const allExercisesBaseQuery = () =>
    async () => {
        try {
            const data = await userPermittedActions.getAllExerciseTypes()
            return { data }
        } catch (error) {
            throw new Error(error)
        }
    }

export const exercisesApi = createApi({
    reducerPath: 'exercisesApi',
    baseQuery: allExercisesBaseQuery(),
    tagTypes: [RTKQ_TAGS.EXERCISES],
    endpoints: (builder) => ({
        getAllExercises: builder.query({
            query: () => allExercisesBaseQuery(),
            providesTags: [RTKQ_TAGS.EXERCISES]
        }),
        deleteExercise: builder.mutation({
            queryFn: (id) => ({ data: userPermittedActions.deleteExerciseTypeById(id) }),
            invalidatesTags: [RTKQ_TAGS.EXERCISES]
        }),
        createExercise: builder.mutation({
            queryFn: (newExerciseData) => ({ data: userPermittedActions.createExerciseType(newExerciseData) }),
            invalidatesTags: [RTKQ_TAGS.EXERCISES]
        }),
        getExerciseById: builder.query({
            queryFn: (exercise_id) => ({ data: userPermittedActions.getExerciseType(Number(exercise_id)) }),
            providesTags: [RTKQ_TAGS.EXERCISES]
        }),
        updateExerciseById: builder.mutation({
            queryFn: (exercise) => ({ data: userPermittedActions.updateExerciseTypeById(exercise) }),
            invalidatesTags: [RTKQ_TAGS.EXERCISES]
        })
    })
})

export const { useGetAllExercisesQuery, useDeleteExerciseMutation, useCreateExerciseMutation, useGetExerciseByIdQuery, useUpdateExerciseByIdMutation } = exercisesApi
