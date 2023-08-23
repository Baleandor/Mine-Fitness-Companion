import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { RTKQ_TAGS } from '../util/rtkqTags';
import { supabase } from '../util/supabase';





export const measureApi = createApi({
    reducerPath: 'measureApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: [RTKQ_TAGS.MEASUREMENTS],
    endpoints: (builder) => ({
        getMeasurements: builder.query({
            queryFn: async () => {
                const user = await supabase.auth.getUser()
                let { data: measurements } = await supabase
                    .from('measurements')
                    .select("*")
                    .eq('user_id', user.data.user?.id)

                let latestMeasure
                if (measurements != undefined) {
                    const lastMeasurement = [...Object.values(measurements)].sort((a, b) => {

                        return a.date - b.date
                    })
                    latestMeasure = lastMeasurement[lastMeasurement.length - 1]
                }
                return { data: latestMeasure }
            },
            providesTags: [RTKQ_TAGS.MEASUREMENTS]
        }),
        addMeasurements: builder.mutation({
            queryFn: async (measurementData) => {
                const user = await supabase.auth.getUser()
             

                const { data } = await supabase
                    .from('measurements')
                    .insert([
                        {
                            image_url: measurementData.imageUrl,
                            weight: measurementData.weight,
                            chest: measurementData.chest,
                            waist: measurementData.waist,
                            hips: measurementData.hips,
                            biceps: measurementData.biceps,
                            date: measurementData.newDate,
                            user_id: user.data.user?.id
                        },
                    ])
                    .select()

                return { data: data }
            },
            invalidatesTags: [RTKQ_TAGS.MEASUREMENTS]

        }),
        getMeasurementsChartsData: builder.query({
            queryFn: async () => {
                const user = await supabase.auth.getUser()
               

                let { data: measurements } = await supabase
                    .from('measurements')
                    .select("*")
                    .eq('user_id', user.data.user?.id)




                return { data: measurements }
            },
            providesTags: [RTKQ_TAGS.MEASUREMENTS]
        }),
        getMeasurementsChartsDataRange: builder.query({
            queryFn: async (dateRange: number[]) => {
                const user = await supabase.auth.getUser()
            

                let { data: measurements } = await supabase
                    .from('measurements')
                    .select("*")
                    .eq('user_id', user.data.user?.id)
                    .gte('date', dateRange[0])
                    .lte('date', dateRange[1])


                return { data: measurements }
            },
            providesTags: [RTKQ_TAGS.MEASUREMENTS]
        })
    })
})


export const { useGetMeasurementsQuery, useAddMeasurementsMutation, useGetMeasurementsChartsDataQuery, useGetMeasurementsChartsDataRangeQuery } = measureApi


