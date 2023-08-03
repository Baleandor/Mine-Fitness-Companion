import { createApi } from '@reduxjs/toolkit/query/react'
import { userPermittedActions } from '../backend/userPermittedActions'
import { RTKQ_TAGS } from '../util/rtkqTags';



const measurementsBaseQuery = () =>
    async () => {
        try {
            const data = await userPermittedActions.getUserMeasurements()
            return { data }
        } catch (error) {
            throw new Error(error)
        }
    }

export const measureApi = createApi({
    reducerPath: 'measureApi',
    baseQuery: measurementsBaseQuery(),
    tagTypes: [RTKQ_TAGS.MEASUREMENTS],
    endpoints: (builder) => ({
        getMeasurements: builder.query({
            query: () => measurementsBaseQuery(),
            providesTags: [RTKQ_TAGS.MEASUREMENTS]
        }),
        addMeasurements: builder.mutation({
            queryFn: (data) => ({ data: userPermittedActions.addUserMeasurements(data) }),
            invalidatesTags: [RTKQ_TAGS.MEASUREMENTS]

        }),
        getMeasurementsChartsData: builder.query({
            queryFn: () => ({ data: userPermittedActions.getUserMeasurementsChartData() }),
            providesTags: [RTKQ_TAGS.MEASUREMENTS]
        }),
        getMeasurementsChartsDataRange: builder.query({
            queryFn: (dateRange) => ({ data: userPermittedActions.getUserMeasurementsChartRangeData(dateRange) }),
            providesTags: [RTKQ_TAGS.MEASUREMENTS]
        }),
        getUserProfile: builder.query({
            queryFn: () => ({ data: '' })
        })
    })
})


export const { useGetMeasurementsQuery, useAddMeasurementsMutation, useGetMeasurementsChartsDataQuery, useGetMeasurementsChartsDataRangeQuery } = measureApi


