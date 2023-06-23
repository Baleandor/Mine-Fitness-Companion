import dayjs from "dayjs"
import { measurementEvent } from "../mockBackend/measurementEvent"


export default function MeasurementsOverTime() {
    const measurementDates = measurementEvent.get('date')

    return (
        <div className="flex flex-col justify-center items-center">
            <div>
                <span>Measurements Over Time</span>
            </div>
            <div>
                <span>Weight: {measurementEvent.get('weight').join(" ")}</span>
            </div>
            <div>
                <span>Chest: {measurementEvent.get('chest').join(" ")}</span>
            </div>
            <div>
                <span>Waist: {measurementEvent.get('waist').join(" ")}</span>
            </div>
            <div>
                <span>Hips: {measurementEvent.get('hips').join(" ")}</span>
            </div>
            <div>
                <span>Biceps: {measurementEvent.get('biceps').join(" ")}</span>
            </div>
            <div>
                <span>Dates:</span>
                {measurementDates.map((day) => {
                    return <span className="p-1" key={day}>{dayjs(day).format('DD/MM/YYYY')}</span>
                })}

            </div>
        </div>
    )
}