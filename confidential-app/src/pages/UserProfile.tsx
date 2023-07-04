import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { ROUTE_PATH } from "../util/urls"
import { userPermittedActions } from "../api/userPermittedActions"


export default function UserProfile() {

    const userBasicInfo = userPermittedActions.getUserBasicInfo()

    const userMeasurementInfo = userPermittedActions.getUserMeasurements()

    const userWorkouts = userPermittedActions.getUserWorkouts()

    const navigate = useNavigate()


    return (
        <div className="flex justify-between">
            <div className="flex flex-col p-1">
                <div>
                    <span>Basic Personal Data</span>
                </div>
                <div>
                    <span>Name: {userBasicInfo.name}</span>
                </div>
                <div>
                    <span>Email: {userBasicInfo.email}</span>
                </div>
                <div>
                    <span>Gender: {userBasicInfo.gender}</span>
                </div>
                <div>
                    <span>Date of Birth: {dayjs(userBasicInfo.dateOfBirth).format('DD/MM/YYYY')}</span>
                </div>
                <div>
                    <span>Height: {userBasicInfo.height}</span>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700" onClick={() => navigate(ROUTE_PATH.USER_PROFILE_BASIC_INFO)}>Update Basic Info</button>
                </div>
            </div>

            <div className="flex flex-col p-1">
                <div>
                    <span>Current Progress</span>
                </div>
                <div>
                    <img src={userMeasurementInfo.imageUrl} className="h-[150px] w-[150px]"></img>
                </div>
                <div>
                    <span>Weight: {userMeasurementInfo.weight[userMeasurementInfo.weight.length - 1]}</span>
                </div>
                <div>
                    <span>Chest: {userMeasurementInfo.chest[userMeasurementInfo.chest.length - 1]}</span>
                </div>
                <div>
                    <span>Waist: {userMeasurementInfo.waist[userMeasurementInfo.waist.length - 1]}</span>
                </div>
                <div>
                    <span>Hips: {userMeasurementInfo.hips[userMeasurementInfo.hips.length - 1]}</span>
                </div>
                <div>
                    <span>Biceps: {userMeasurementInfo.biceps[userMeasurementInfo.biceps.length - 1]}</span>
                </div>
                <div>
                    <span>Date: {dayjs(userMeasurementInfo.date[userMeasurementInfo.date.length - 1]).format('DD/MM/YYYY')}</span>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700 mb-1" onClick={() => navigate(ROUTE_PATH.USER_PROFILE_MEASUREMENTS)}>Add Measurements</button>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700 mb-1" onClick={() => navigate(ROUTE_PATH.CHECK_ALL_MEASUREMENTS)}>Check All Measurements</button>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700" onClick={() => navigate(ROUTE_PATH.USER_PROFILE_MEASUREMENTS_OVER_TIME)}>Check Measurements Timeline</button>
                </div>
            </div>

            <div className="flex flex-col p-1">
                <div>
                    <span>Workouts: {userWorkouts.exercises.length}</span>
                </div>
                <div>
                    <span>Exercises:</span>
                    <div>
                        {userWorkouts.exercises.map((exercise: string[]) => {
                            return <ul key={exercise.length} className="border rounded-md border-red-400 p-1 mb-1">
                                {exercise.map((element) => {
                                    return <li key={element.length}>{element}</li>
                                })}
                            </ul>
                        })}
                    </div>
                </div>
                <div>
                    <span>Date: {dayjs(userWorkouts.date[userWorkouts.date.length - 1]).format('DD/MM/YYYY')}</span>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700 mb-1" onClick={() => navigate(ROUTE_PATH.USER_PROFILE_WEIGHT_OVER_TIME)}>View Weight Over Time</button>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700" onClick={() => navigate(ROUTE_PATH.WORKOUTS)}>View Workouts</button>
                </div>
            </div>
        </div>
    )
}






