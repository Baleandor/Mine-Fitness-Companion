import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { RTKQ_TAGS } from "../util/rtkqTags"
import { supabase } from "../util/supabase"



export const exercisesApi = createApi({
    reducerPath: 'exercisesApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: [RTKQ_TAGS.EXERCISES],
    endpoints: (builder) => ({
        getAllExercises: builder.query({
            queryFn: async () => {
                let { data: exercise, error } = await supabase
                    .from('exercise')
                    .select('*')
                return { data: exercise }
            },
            providesTags: [RTKQ_TAGS.EXERCISES]
        }),
        deleteExercise: builder.mutation({
            queryFn: async (id) => {
                const { error } = await supabase
                    .from('exercise')
                    .delete()
                    .eq('id', id)

                return { error }
            },
            invalidatesTags: [RTKQ_TAGS.EXERCISES]
        }),
        createExercise: builder.mutation({
            queryFn: async (newExerciseData) => {

                const { data, error } = await supabase
                    .from('exercise')
                    .insert([
                        { name: newExerciseData.name, muscle_groups: newExerciseData.muscle_groups },
                    ])
                    .select()

                return { data: data }
            },
            invalidatesTags: [RTKQ_TAGS.EXERCISES]
        }),
        getExerciseById: builder.query({
            queryFn: async (exercise_id) => {
                let { data: exercise, error } = await supabase
                    .from('exercise')
                    .select("*")
                    .eq('id', exercise_id)

                return { data: exercise }
            },
            providesTags: [RTKQ_TAGS.EXERCISES]
        }),
        updateExerciseById: builder.mutation({
            queryFn: async (exercise) => {
                const { data, error } = await supabase
                    .from('exercise')
                    .update({ name: exercise.exerciseName, muscle_groups: exercise.muscleGroups })
                    .eq('id', exercise.id)
                    .select()

                return { data: data }
            },
            invalidatesTags: [RTKQ_TAGS.EXERCISES]
        })
    })
})

export const { useGetAllExercisesQuery, useDeleteExerciseMutation, useCreateExerciseMutation, useGetExerciseByIdQuery, useUpdateExerciseByIdMutation } = exercisesApi
