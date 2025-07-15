import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RTKQ_TAGS } from "../util/rtkqTags";
import { supabase } from "../util/supabase";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const workoutsApi = createApi({
  reducerPath: "workoutsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: [RTKQ_TAGS.WORKOUTS, RTKQ_TAGS.FILTERED_WORKOUTS],
  endpoints: (builder) => ({
    getAllWorkouts: builder.query({
      queryFn: async () => {
        const user = await supabase.auth.getUser();

        const { data: workouts } = await supabase
          .from("workouts")
          .select("*")
          .eq("user_id", user.data.user?.id);

        return { data: workouts };
      },
      providesTags: [RTKQ_TAGS.WORKOUTS],
    }),
    filter: builder.query({
      queryFn: async (filterData) => {
        const user = await supabase.auth.getUser();

        const { data } = await supabase
          .from("workouts")
          .select()
          .eq("user_id", user.data.user?.id)
          .contains("exercises", [filterData]);

        return { data: data };
      },
      providesTags: [RTKQ_TAGS.FILTERED_WORKOUTS],
    }),
    filterViaDate: builder.query({
      queryFn: async (filterDate) => {
        const user = await supabase.auth.getUser();

        const date = dayjs(filterDate, "DD/MM/YYYY").valueOf();
        const { data: workouts } = await supabase
          .from("workouts")
          .select("*")
          .eq("user_id", user.data.user?.id)
          .eq("date", date);

        return { data: workouts };
      },
      providesTags: [RTKQ_TAGS.FILTERED_WORKOUTS],
    }),
    getWorkoutById: builder.query({
      queryFn: async (id) => {
        const { data: workouts } = await supabase
          .from("workouts")
          .select("*")
          .eq("id", id);

        return { data: workouts };
      },
      providesTags: [RTKQ_TAGS.WORKOUTS],
    }),
    updateWorkout: builder.mutation({
      queryFn: async (updatedWorkoutData) => {
        const { data } = await supabase
          .from("workouts")
          .update({
            exercises: updatedWorkoutData.exercises,
            date: updatedWorkoutData.date,
          })
          .eq("id", updatedWorkoutData.id)
          .select();

        return { data: data };
      },
      invalidatesTags: [RTKQ_TAGS.WORKOUTS],
    }),
    createWorkout: builder.mutation({
      queryFn: async (newWorkoutData) => {
        const user = await supabase.auth.getUser();

        const { data } = await supabase
          .from("workouts")
          .insert([
            {
              exercises: newWorkoutData.exercises,
              date: newWorkoutData.date,
              user_id: user.data.user?.id,
            },
          ])
          .select();

        return { data: data };
      },
      invalidatesTags: [RTKQ_TAGS.WORKOUTS],
    }),
    deleteWorkout: builder.mutation({
      queryFn: async (id: string) => {
        const { error } = await supabase.from("workouts").delete().eq("id", id);

        return { data: "" };
      },
      invalidatesTags: [RTKQ_TAGS.WORKOUTS],
    }),
  }),
});

export const {
  useGetAllWorkoutsQuery,
  useFilterQuery,
  useFilterViaDateQuery,
  useGetWorkoutByIdQuery,
  useUpdateWorkoutMutation,
  useCreateWorkoutMutation,
  useDeleteWorkoutMutation,
} = workoutsApi;
