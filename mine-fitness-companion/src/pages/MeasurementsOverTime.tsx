import { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import DateRangePicker from "../components/DateRangePicker";
import LineChart from "../components/LineChart";
import { useGetMeasurementsChartsDataQuery, useGetMeasurementsChartsDataRangeQuery } from "../redux/measurementsApi";
import { useAppSelector } from "../hooks/hooks";
import { userChartData } from "../util/userChartData";
import { skipToken } from "@reduxjs/toolkit/dist/query";



type MeasurementChartDataType = {
    labels: number[] | string[];
    datasets: {
        label: string;
        data: number[];
    }[];
}




export default function MeasurementsOverTime() {


    const isUserLoggedIn = useAppSelector((state) => state.isLoggedIn)

    const [dateRange, setDateRange] = useState<number[]>([])

    const [chartData, setChartData] = useState<MeasurementChartDataType>({ labels: [], datasets: [] })

    const { data } = useGetMeasurementsChartsDataQuery(isUserLoggedIn ?? skipToken)

    const { data: newRange } = useGetMeasurementsChartsDataRangeQuery(dateRange ?? skipToken)

    useEffect(() => {
        if (data != null && data != undefined) {
            setChartData(userChartData(data))
        }

    }, [data])

    const handleDateRangeChange = (values: Dayjs[]) => {

        const [startDate, endDate] = values

        const newDateRange = [dayjs(startDate).valueOf(), dayjs(endDate).valueOf()]

        setDateRange(newDateRange)
    }

    const displayDateRangeData = () => {
        setChartData(userChartData(newRange))
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <div className="p-1">
                <span>Measurements Progress Over Time</span>
            </div>
            <div className="flex">
                <DateRangePicker handleDateRangeChange={handleDateRangeChange} />
                <button className="p-1 border rounded-md border-red-700" onClick={displayDateRangeData}>Filter</button>
            </div>
            {!chartData && <div className="p-1 text-red-600 text-3xl">No data found!</div>}
            {chartData && <LineChart chartData={chartData} />}
        </div>
    )
}