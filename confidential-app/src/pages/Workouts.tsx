import { workoutOne } from "../mockBackend/workout"
import { exercise } from "../mockBackend/exercise"
import { exerciseTypes } from "../mockBackend/exerciseType"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { useState } from "react"



export default function Workouts() {

    const navigate = useNavigate()

    const [filteredWorkout, setFilteredWorkout] = useState('')

    const workoutDate = dayjs(workoutOne.get('date')[workoutOne.get('date').length - 1]).format('DD/MM/YYYY')

    const handleOnChange = (event) => {
        setFilteredWorkout(event.target.value)
    }

    const filterWorkout = () => {
        if (exerciseTypes.hasOwnProperty(filteredWorkout)) {
            console.log('chicken dinner')
        }

    }



    return (
        <div>
            <div className="flex flex-col items-center p-1">
                <span className="p-1">Search workout</span>
                <input onChange={handleOnChange}></input>
                <button onClick={filterWorkout} className="p-1 border rounded border-red-700 mt-1">Search</button>
            </div>

            <div className="p-2 flex">
                <div className="p-1 flex flex-col">
                    <span>Workout exercises:</span>
                    <ul>
                        {workoutOne.get('exercises').map((exercise) => {
                            return <li key={exercise} className="ml-3">{exercise}</li>
                        })}
                    </ul>
                    <span>Date:</span>
                    <span>{workoutDate}</span>

                    <button className="border rounded border-red-700" onClick={() => navigate(`edit/${workoutOne.get('id')}`)}>Edit workout</button>
                </div>
            </div>
        </div>
    )
}