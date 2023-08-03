import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { ROUTE_PATH } from "../util/urls"
import { useState } from "react"
import { useGetMeasurementsQuery } from '../redux/measurementsApi'
import { useAppSelector } from "../hooks/hooks"
import { useGetBasicInfoQuery } from "../redux/basicInfoApi"
import { useGetAllWorkoutsQuery } from "../redux/workoutsApi"




export default function UserProfile() {

    const user = useAppSelector((state) => state.auth.userEmail)

    const navigate = useNavigate()

    const [isWeightChart] = useState(true)

    const { data: measurements } = useGetMeasurementsQuery(user)

    const { data: basicInfo } = useGetBasicInfoQuery(user)

    const { data: allWorkouts } = useGetAllWorkoutsQuery(user)





    return (
        <div className="flex justify-between">
            <div className="flex flex-col p-1">
                <div>
                    <span>Basic Personal Data</span>
                </div>
                {basicInfo != undefined ?
                    <div>
                        {Object.entries(basicInfo).map((entry) => {
                            if (entry[0] === 'id' || entry[0] === 'role' || entry[0] === 'password') {
                                return
                            }

                            if (entry[0] === 'dateOfBirth') {

                                return <div key={entry[0]}>
                                    <span>birthday: {dayjs(entry[1]).format('DD/MM/YYYY')}</span>
                                </div>
                            }
                            return <div key={entry[0]}>
                                <span>{entry[0]}: {entry[1]}</span>
                            </div>
                        })}
                    </div> : 'No user info!'}
                <div>
                    <button className="p-1 border rounded border-red-700" onClick={() => navigate(ROUTE_PATH.USER_PROFILE_BASIC_INFO)}>Update Basic Info</button>
                </div>
            </div>

            <div className="flex flex-col p-1">
                <div>
                    <span>Current Progress</span>
                </div>
                {measurements && measurements != undefined ?
                    <div>
                        {Object.entries(measurements).map((entry) => {
                            if (entry[0] === 'imageUrl') {
                                return <div key={entry[0]}> <img src={entry[1]} className="h-[150px] w-[150px]"></img> </div>
                            }
                            if (entry[0] === 'measurements') {
                                return Object.entries(entry[1][0]).map((measurementEntry) => {
                                    if (measurementEntry[0] === 'date') {
                                        return <div key={measurementEntry[0]}>
                                            <span>date: {dayjs(measurementEntry[1]).format('DD/MM/YYYY')}</span>
                                        </div>
                                    }
                                    return <div key={measurementEntry[0]}>
                                        <span>{measurementEntry[0]}: {`${measurementEntry[1]}cm`}</span>
                                    </div>
                                })
                            }
                        })}
                    </div> :
                    <div className="p-1">No measurements present!</div>}

                <div>
                    <button className="p-1 border rounded border-red-700 mb-1" onClick={() => navigate(ROUTE_PATH.USER_PROFILE_MEASUREMENTS)}>Add Measurements</button>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700 mb-1" onClick={() => navigate(ROUTE_PATH.USER_PROFILE_CHECK_ALL_MEASUREMENTS)}>Check All Measurements</button>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700" onClick={() => navigate(ROUTE_PATH.USER_PROFILE_MEASUREMENTS_OVER_TIME)}>Check Measurements Timeline</button>
                </div>
            </div>

            <div className="flex flex-col p-1">
                <div>
                    <span>Workouts: {allWorkouts ? allWorkouts.exercises.length : 'No workouts!'}</span>
                </div>
                <div>
                    <span>Exercises:</span>
                    <div>
                        {allWorkouts ? <ul className="border rounded-md border-blue-700 p-1 mb-1">
                            {allWorkouts?.exercises.map((exercise: string) => {
                                return <li key={exercise}>{exercise}</li>
                            })}
                        </ul> : 'No exercises!'}

                    </div>
                </div>
                <div>
                    <span>Date: {allWorkouts ? dayjs(allWorkouts.date).format('DD/MM/YYYY') : 'No workouts!'}</span>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700 mb-1" onClick={() => navigate(ROUTE_PATH.USER_PROFILE_WEIGHT_OVER_TIME, { state: isWeightChart })}>View Weight Progress</button>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700" onClick={() => navigate(ROUTE_PATH.WORKOUTS)}>View Workouts</button>
                </div>
            </div>
        </div>
    )
}






