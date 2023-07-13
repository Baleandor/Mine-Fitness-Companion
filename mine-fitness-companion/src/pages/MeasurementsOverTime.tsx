import { useState } from "react"
import dayjs from "dayjs"
import { measurementsData } from "../backend/mockData/measurementEvent"


type MeasurementsChartDataType = {
    date: number;
    weight: number;
    chest: number;
    waist: number;
    hips: number;
    biceps: number;
}[]



export default function MeasurementsOverTime() {

    const [startDate, setStartDate] = useState(0)
    const [endDate, setEndDate] = useState(0)
    const [chartDateRange, setChartDateRange] = useState<MeasurementsChartDataType>([])

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
        const dateRange: MeasurementsChartDataType = []
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

                <button className="p-1 border rounded-md border-red-700" onClick={displayDateRangeData}>Search</button>
            </div>
   
        </div >
    )
}