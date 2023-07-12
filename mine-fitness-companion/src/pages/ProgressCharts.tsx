import { useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import dayjs from "dayjs"
import { measurementsData } from "../mockBackend/measurementEvent"

export default function MeasurementsOverTime() {

    const [startDate, setStartDate] = useState(0)
    const [endDate, setEndDate] = useState(0)
    const [chartDateRange, setChartDateRange] = useState<any[]>([])

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
        const dateRange: any[] = []
        measurementsData.forEach((line) => {
            if (line.date >= startDate && line.date <= endDate) {
                dateRange.push(line)
            }
        })
        setChartDateRange(dateRange)
    }

    const displayDateRangeData = () => {
        getDateRange()
        setShowChart(true)
    }

    console.log(chartDateRange)

    return (


        <div className="flex flex-col justify-center items-center">
            <div className="p-1">
                <span>Progress Chart</span>
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
                    {chartDateRange.map((line) => {
                        console.log(line)
                    })}
                    <Line type={"monotone"} dataKey={'weight'} stroke="red" strokeWidth={2}></Line>
                    <Line type={"monotone"} dataKey={'chest'} stroke="blue" strokeWidth={2}></Line>
                    <Line type={"monotone"} dataKey={'waist'} stroke="yellow" strokeWidth={2}></Line>
                    <Line type={"monotone"} dataKey={'hips'} stroke="brown" strokeWidth={2}></Line>
                    <Line type={"monotone"} dataKey={'biceps'} stroke="magenta" strokeWidth={2}></Line>
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