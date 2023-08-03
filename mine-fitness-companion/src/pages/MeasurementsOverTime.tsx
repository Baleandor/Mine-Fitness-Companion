import { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import DateRangePicker from "../components/DateRangePicker";
import LineChart from "../components/LineChart";
import { useGetMeasurementsChartsDataQuery, useGetMeasurementsChartsDataRangeQuery } from "../redux/measurementsApi";
import { getUser } from "../util/getSession";



type MeasurementChartDataType = {
    labels: number[] | string[];
    datasets: {
        label: string;
        data: number[];
    }[];
} | undefined




export default function MeasurementsOverTime() {

    // const user = getUser()

    const [dateRange, setDateRange] = useState<number[]>()

    const [chartData, setChartData] = useState<MeasurementChartDataType>({ labels: [], datasets: [] })

    const { data } = useGetMeasurementsChartsDataQuery(user)

    const { data: newRange } = useGetMeasurementsChartsDataRangeQuery(dateRange)

    useEffect(() => {
        if (data != null) {
            setChartData(data)
        }

    }, [data])

    const handleDateRangeChange = (values: Dayjs[]) => {
        if (values == undefined || values.length === 0) {
            setChartData(data)
        } else {
            const [startDate, endDate] = values
            const newDateRange = [dayjs(startDate).valueOf(), dayjs(endDate).valueOf()]
            setDateRange(newDateRange)
        }
    }

    const displayDateRangeData = () => {
        if (dateRange) {
            setChartData(newRange)
        }
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
            {chartData?.labels.length === 0 && <div className="p-1 text-red-600 text-3xl">No data found!</div>}
            {chartData && <LineChart chartData={chartData} />}
        </div>
    )
}