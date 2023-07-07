import dayjs from "dayjs"
import { userPermittedActions } from "../api/userPermittedActions"



export default function CheckAllMeasurements() {

    const userMeasurements = userPermittedActions.getUserMeasurements()

    return (
        <div className="flex flex-col">

            {Object.keys(userMeasurements).map((entry) => {
                if (entry === 'date') {
                    return <div className="border rounded-md border-red-400 mb-2 p-1" key={entry}>{`${entry}: ${userMeasurements[entry].map(date => {
                        return ` ${dayjs(date).format('DD/MM/YYYY')}`
                    })}`}</div>
                } else {
                    return <div className="border rounded-md border-red-400 mb-2 p-1" key={entry}>{`${entry}: ${userMeasurements[entry]}`}</div>
                }
            })}



        </div>
    )
}