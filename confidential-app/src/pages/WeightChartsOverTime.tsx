import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { exerciseProgressData } from "../mockBackend/exercise";
import dayjs from "dayjs";
import { useState } from "react";
import DateRagePicker from "../components/DateRangePicker";


type ChartDisplayDataType = {
    date: number;
    deadlift: number;
    squat: number;
    'bench press': number;
    sprint: number;

}[]


export default function WeightChartsOverTime() {

    const [chartDateRange, setChartDateRange] = useState<ChartDisplayDataType>([])

    const [dateRange, setDateRange] = useState<number[]>()

    const [showChart, setShowChart] = useState(false)

    const handleDateRageChange = (values: dayjs.Dayjs[]) => {
        const [startDate, endDate] = values
        const newDateRange = [dayjs(startDate).valueOf(), dayjs(endDate).valueOf()]

        setDateRange(newDateRange)
    }

    const getDateRange = () => {
        const datesWithinRange: ChartDisplayDataType = []
        exerciseProgressData.forEach((line) => {
            if (dateRange) {
                if (line.date >= dateRange[0] && line.date <= dateRange[1]) {
                    datesWithinRange.push(line)
                }
            }
        })
        setChartDateRange(datesWithinRange)
    }

    const displayDateRangeData = () => {
        getDateRange()
        setShowChart(true)
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <div className="p-1">
                <span>Exercise Weight Progress Over Time</span>
            </div>
            <div className="flex">
                <DateRagePicker handleDateRageChange={handleDateRageChange} />
                <button className="p-1 border rounded-md border-red-700" onClick={displayDateRangeData}>Search</button>
            </div>
            {
                showChart &&
                <LineChart width={600} height={300} data={chartDateRange}>
                    <Line type={"monotone"} dataKey={'deadlift'} stroke="red" strokeWidth={2}></Line>
                    <Line type={"monotone"} dataKey={'squat'} stroke="green" strokeWidth={2}></Line>
                    <Line type={"monotone"} dataKey={'bench press'} stroke="blue" strokeWidth={2}></Line>
                    <Line type={"monotone"} dataKey={'sprint'} stroke="brown" strokeWidth={2}></Line>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey={'date'} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </LineChart>
            }
        </div>
    )
}