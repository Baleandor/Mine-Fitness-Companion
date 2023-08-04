import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { RTKQ_TAGS } from "../util/rtkqTags"
import { supabase } from "../util/supabase"



export const basicInfoApi = createApi({
    reducerPath: 'infoApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: [RTKQ_TAGS.BASIC_INFO],
    endpoints: (builder) => ({
        getBasicInfo: builder.query({
            queryFn: async () => {

                const { data: { user } } = await supabase.auth.getUser()

                return { data: user?.user_metadata }
            },
            providesTags: [RTKQ_TAGS.BASIC_INFO]
        }),
        updateBasicInfo: builder.mutation({
            queryFn: async (userData) => {
                const { data, error } = await supabase.auth.updateUser({
                    email: userData.email,
                    password: userData.password,
                    data: {
                        name: userData.name,
                        gender: userData.gender,
                        birthDate: userData.dateOfBirth,
                        height: userData.height
                    }
                })
                return { data: data || error }
            },
            invalidatesTags: [RTKQ_TAGS.BASIC_INFO]
        }),
    })
})


export const { useGetBasicInfoQuery, useUpdateBasicInfoMutation } = basicInfoApi