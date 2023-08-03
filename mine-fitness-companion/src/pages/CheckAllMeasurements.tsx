import dayjs from "dayjs"

import { useGetMeasurementsQuery } from "../redux/measurementsApi"
import { getUser } from "../util/getSession"



export default function CheckAllMeasurements() {

    // const user = getUser()

    const { data } = useGetMeasurementsQuery(user)



    return (
        <div className="flex flex-col">

            {data ? Object.keys(data).map((entry) => {
                if (entry === 'dates') {
                    return <div className="border rounded-md border-red-400 mb-2 p-1" key={entry}>{`${entry}: ${data[entry].map((date: number) => {
                        return dayjs(date).format('DD/MM/YYYY')
                    })}`}</div>
                } else {
                    return <div className="border rounded-md border-red-400 mb-2 p-1" key={entry}>{`${entry}: ${data[entry]}`}</div>
                }
            }) :
                <div className="p-1">No measurements found!</div>}
        </div>
    )
}