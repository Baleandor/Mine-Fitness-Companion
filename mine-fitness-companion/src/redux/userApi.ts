import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { RTKQ_TAGS } from '../util/rtkqTags';
import { supabase } from '../util/supabase';



export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: [RTKQ_TAGS.USER],
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            queryFn: async (userData) => {

                let { data, error } = await supabase.auth.signInWithPassword({
                    email: userData.email,
                    password: userData.password
                })

                return { data: data.session || error }
            },
            invalidatesTags: [RTKQ_TAGS.USER]
        }),
        userRegister: builder.mutation({
            queryFn: async (userData) => {
                let { data, error } = await supabase.auth.signUp({
                    email: userData.email,
                    password: userData.password,
                    options: {
                        data: {
                            name: userData.name,
                            gender: userData.gender,
                            birthDate: userData.birthDate,
                            height: userData.height,
                            role: 'user'
                        }
                    }
                })
                return { data: data || error }
            },
            invalidatesTags: [RTKQ_TAGS.USER]
        }),
        userLogout: builder.mutation({
            queryFn: async () => {
                const { error } = await supabase.auth.signOut()
                return { data: error }
            },
            invalidatesTags: [RTKQ_TAGS.USER]
        }),
        userProfile: builder.query({
            queryFn: (email) => ({ data: '' }),
            providesTags: [RTKQ_TAGS.USER]
        })
    })
})

export const { useUserLoginMutation, useUserRegisterMutation, useUserLogoutMutation, useUserProfileQuery } = userApi
