import dayjs from "dayjs"
import { userPermittedActions } from "../api/userPermittedActions"



export default function CheckAllMeasurements() {

    const userMeasurements = userPermittedActions.getUserMeasurements()
    const { weight, chest, waist, hips, biceps, date } = userMeasurements
    const userMeasurementInfo = { weight, chest, waist, hips, biceps, date }
    // console.log()
    return (
        <div className="flex flex-col">
      
                {Object.entries(userMeasurementInfo).map((entry) => {
                    if (entry[0] === 'date') {
                        return <div className="border rounded-md border-red-400 mb-2 p-1" key={entry[0]}>{`${entry[0]}: ${entry[1].map(date => {
                            return dayjs(date).format('DD/MM/YYYY')
                        })}`}</div>
                    } else {
                        return <div className="border rounded-md border-red-400 mb-2 p-1" key={entry[0]}>{`${entry[0]}: ${entry[1]}`}</div>
                    }
                })}
           


        </div>
    )
}