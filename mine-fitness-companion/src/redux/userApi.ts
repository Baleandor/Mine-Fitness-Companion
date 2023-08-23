import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { RTKQ_TAGS } from '../util/rtkqTags';
import { supabase } from '../util/supabase';
import { AuthSession } from '@supabase/supabase-js';



export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: [RTKQ_TAGS.USER],
    endpoints: (builder) => ({
        userLogin: builder.mutation<AuthSession | null, any>({
            queryFn: async (userData) => {
                try {
                    let { data, error } = await supabase.auth.signInWithPassword({
                        email: userData.email,
                        password: userData.password
                    })

                    if (error) {
                        throw new Error(error.message)
                    }

         

                    return { data: data.session }
                } catch (error: any) {

                    return { error: error?.message }

                }


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
    })
})

export const { useUserLoginMutation, useUserRegisterMutation, useUserLogoutMutation } = userApi
