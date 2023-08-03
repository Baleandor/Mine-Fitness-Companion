
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import DateRangePicker from "../components/DateRangePicker";
import { userPermittedActions } from "../backend/userPermittedActions";
import LineChart from "../components/LineChart";
import { ChartDataType } from "../util/types";



export default function WeightChartsOverTime() {

    const [chartData, setChartData] = useState<ChartDataType>()

    const [dateRange, setDateRange] = useState<number[]>()

    useEffect(() => {
        const loadAllChartData = userPermittedActions.getAllExerciseWeightChartData()
        setChartData(loadAllChartData)
    }, [])

    const handleDateRangeChange = (values: Dayjs[]) => {
        if (values == undefined || values.length === 0) {
            setChartData(userPermittedActions.getAllExerciseWeightChartData())
        } else {
            const [startDate, endDate] = values
            const newDateRange = [dayjs(startDate).valueOf(), dayjs(endDate).valueOf()]
            setDateRange(newDateRange)
        }
    }

    const displayDateRangeData = () => {
        if (dateRange) {
            const newDateRange = userPermittedActions.getExerciseWeightChartDataWithinRange(dateRange)
            setChartData(newDateRange)
        }
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <div className="p-1">
                <span>Exercise Weight Progress Over Time</span>
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