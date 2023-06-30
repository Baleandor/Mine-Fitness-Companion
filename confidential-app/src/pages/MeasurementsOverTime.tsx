import { useState } from "react"
import { measurementData } from "../mockBackend/measurementEvent"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import dayjs from "dayjs"

export default function MeasurementsOverTime() {

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [chartDateRange, setChartDateRange] = useState([])

    const [showChart, setShowChart] = useState(false)

    const handleStartDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value)
    }

    const handleEndDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value)
    }

    const getDateRange = () => {
        const dateRage: string[] = []
        measurementData.forEach((line) => {
            dateRage.push(line.date)
        })
    }

    const toggleChart = () => {
        getDateRange()
        setShowChart(!showChart)
        // console.log(dayjs(startDate).format('DD/MM/YYYY'), dayjs(endDate).format('DD/MM/YYYY'))
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <div className="p-1">
                <span>Measurements Over Time</span>
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
                <button className="p-1 border rounded-md border-red-700" onClick={toggleChart}>Show Chart</button>
            </div>
            {
                showChart &&
                <LineChart width={600} height={300} data={measurementData}>
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