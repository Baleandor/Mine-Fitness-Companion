import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { exerciseProgressData } from "../mockBackend/exercise";
import dayjs from "dayjs";
import { useState } from "react";



export default function WeightChartsOverTime() {


    const [startDate, setStartDate] = useState(0)
    const [endDate, setEndDate] = useState(0)
    const [chartDateRange, setChartDateRange] = useState([])

    const [showChart, setShowChart] = useState(false)

    const handleStartDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = dayjs(event.target.value).valueOf()
        setStartDate(newDate)
    }

    const handleEndDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = dayjs(event.target.value).valueOf()

        setEndDate(newDate)
    }

    const getDateRange = () => {
        const dateRange = []
        exerciseProgressData.forEach((line) => {
            if (line.date >= startDate && line.date <= endDate) {
                // line.date = dayjs(line.date).format('DD/MM/YYYY')
                dateRange.push(line)
            }
        })
        setChartDateRange(dateRange)
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
                <div className="p-1">
                    <span className="p-1">Start Date</span>
                    <input type="date" onChange={handleStartDateOnChange}></input>
                </div>
                <div className="p-1">
                    <span className="p-1">Start Date</span>
                    <input type="date" onChange={handleEndDateOnChange}></input>
                </div>

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