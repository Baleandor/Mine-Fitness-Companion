import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { userPermittedActions } from "../backend/userPermittedActions"
import { RTKQ_TAGS } from "../util/rtkqTags"


const basicInfoBaseQuery = () =>
    async (userEmail: string) => {
        try {
            const data = await userPermittedActions.getUserBasicInfo(userEmail)
            return { data }
        } catch (error) {
            throw new Error(error)
        }
    }

export const basicInfoApi = createApi({
    reducerPath: 'infoApi',
    baseQuery: basicInfoBaseQuery(),
    tagTypes: [RTKQ_TAGS.BASIC_INFO],
    endpoints: (builder) => ({
        getBasicInfo: builder.query({
            queryFn: () => ({ data: basicInfoBaseQuery() }),
            providesTags: [RTKQ_TAGS.BASIC_INFO]
        }),
        updateBasicInfo: builder.mutation({
            queryFn: (data) => ({ data: userPermittedActions.updateUserBasicInfo(data) }),
            invalidatesTags: [RTKQ_TAGS.BASIC_INFO]

        }),
    })
})


export const { useGetBasicInfoQuery, useUpdateBasicInfoMutation } = basicInfoApi