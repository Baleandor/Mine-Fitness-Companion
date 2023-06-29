import { useNavigate } from "react-router-dom"
import { measurementEvent } from "../mockBackend/measurementEvent"
import { userOne } from "../mockBackend/users"
import { workoutOne } from "../mockBackend/workout"
import dayjs from "dayjs"


export default function UserProfile() {

    const exercises = workoutOne.get('exercises')

    const measurementDate = dayjs(measurementEvent.get('date')[measurementEvent.get('date').length - 1]).format('DD/MM/YYYY')

    const workoutDate = dayjs(workoutOne.get('date')[workoutOne.get('date').length - 1]).format('DD/MM/YYYY')

    const birthDate = dayjs(userOne.get('dateOfBirth')[userOne.get('dateOfBirth').length - 1]).format('DD/MM/YYYY')

    const navigate = useNavigate()


    return (
        <div className="flex justify-between">
            <div className="flex flex-col p-1">
                <div>
                    <span>Basic Personal Data</span>
                </div>
                <div>
                    <span>Name: {userOne.get('name')}</span>
                </div>
                <div>
                    <span>Email: {userOne.get('email')}</span>
                </div>
                <div>
                    <span>Gender: {userOne.get('gender')}</span>
                </div>
                <div>
                    <span>Date of Birth: {birthDate}</span>
                </div>
                <div>
                    <span>Height: {userOne.get('height')}</span>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700" onClick={() => navigate('update-basic-info')}>Update Basic Info</button>
                </div>
            </div>

            <div className="flex flex-col p-1">
                <div>
                    <span>Current Progress</span>
                </div>
                <div>
                    <img src={measurementEvent.get('imageUrl')[measurementEvent.get('imageUrl').length - 1]} className="h-[150px] w-[150px]"></img>
                </div>
                <div>
                    <span>Weight: {measurementEvent.get('weight')[measurementEvent.get('weight').length - 1]}</span>
                </div>
                <div>
                    <span>Chest: {measurementEvent.get('chest')[measurementEvent.get('chest').length - 1]}</span>
                </div>
                <div>
                    <span>Waist: {measurementEvent.get('waist')[measurementEvent.get('waist').length - 1]}</span>
                </div>
                <div>
                    <span>Hips: {measurementEvent.get('hips')[measurementEvent.get('hips').length - 1]}</span>
                </div>
                <div>
                    <span>Biceps: {measurementEvent.get('biceps')[measurementEvent.get('biceps').length - 1]}</span>
                </div>
                <div>
                    <span>Date: {measurementDate}</span>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700" onClick={() => navigate('update-measurements')}>Update Measurements</button>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700" onClick={() => navigate('measurements-over-time')}>Check Measurements Timeline</button>
                </div>
            </div>

            <div className="flex flex-col p-1">
                <div>
                    <span>Workouts</span>
                </div>
                <div>
                    <span>Exercises:</span>
                    <ul>
                        {exercises.map((exercise: string) => {

                            return <li key={exercise}>{exercise}</li>
                        })}
                    </ul>
                </div>
                <div>
                    <span>Date: {workoutDate}</span>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700" onClick={() => navigate('weight-over-time')}>View Weight Over Time</button>
                </div>
                <div>
                    <button className="p-1 border rounded border-red-700" onClick={() => navigate('/workouts')}>View Workouts</button>
                </div>
            </div>
        </div>
    )
}






