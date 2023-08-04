import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { ROUTE_PATH } from "../util/urls"
import { useEffect, useState } from "react"
import { useGetMeasurementsQuery } from '../redux/measurementsApi'
import { useAppSelector } from "../hooks/hooks"
import { useGetBasicInfoQuery } from "../redux/basicInfoApi"
import { useGetAllWorkoutsQuery } from "../redux/workoutsApi"




export default function UserProfile() {

    const isLoggedIn = useAppSelector((state) => state.isLoggedIn)

    const navigate = useNavigate()

    const [isWeightChart] = useState(true)


    const { data: basicInfo } = useGetBasicInfoQuery(isLoggedIn)

    const { data: measurements } = useGetMeasurementsQuery(isLoggedIn)

    const { data: allWorkouts } = useGetAllWorkoutsQuery(isLoggedIn)


    return (
        <div className="flex justify-between">
            <div className="flex flex-col p-1">
                <div>
                    <span>Basic Personal Data</span>
                </div>
                {basicInfo != undefined ?
                    <div>
                        {Object.entries(basicInfo).map((entry) => {
                            if (entry[0] === 'id' || entry[0] === 'role') {
                                return
                            }

                            if (entry[0] === 'birthDate') {

                                return <div key={entry[0]}>
                                    <span>birthday: {dayjs(entry[1]).format('DD/MM/YYYY')}</span>
                                </div>
                            }
                            if (entry[0] === 'height') {

                                return <div key={entry[0]}>
                                    <span>height: {`${entry[1]}cm`}</span>
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
                {measurements != undefined ?
                    <div>
                        {Object.entries(measurements).map((measurementEntry) => {
                            if (measurementEntry[0] === 'user_id' || measurementEntry[0] === 'id') {
                                return
                            }
                            if (measurementEntry[0] === 'image_url') {
                                return <img key={measurementEntry[0]} src={measurementEntry[1]} className="w-60 h-60"></img>
                            }
                            if (measurementEntry[0] === 'date') {
                                return <div key={measurementEntry[0]}>{measurementEntry[0]}: {dayjs(measurementEntry[1]).format('DD/MM/YYYY')} </div>
                            }
                            if (measurementEntry[0] === 'weight') {
                                return <div key={measurementEntry[0]}>{measurementEntry[0]}: {`${measurementEntry[1]}kg`} </div>
                            }

                            return <div key={measurementEntry[0]}>{measurementEntry[0]}: {`${measurementEntry[1]}cm`} </div>
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
                    <button className="p-1 border rounded border-red-700 mb-1" onClick={() => navigate(ROUTE_PATH.WORKOUTS)}>View Workouts</button>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700" onClick={() => navigate(ROUTE_PATH.USER_PROFILE_WEIGHT_OVER_TIME, { state: isWeightChart })}>View Weight Progress</button>
                </div>

            </div>
        </div>
    )
}






