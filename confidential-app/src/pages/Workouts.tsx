import { workoutByIdMap, workoutOne } from "../mockBackend/workout"
import { exerciseTypes, exerciseTypesByIdMap } from "../mockBackend/exerciseType"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { useState } from "react"
import { userPermittedActions } from "../api/userPermittedActions"



export default function Workouts() {

    const navigate = useNavigate()

    const [filteredWorkout, setFilteredWorkout] = useState('')

    const [displayedWorkout, setDisplayedWorkout] = useState<any>()

    const [filterByDate, setFilterByDate] = useState(false)



    const toggleDateSearchButton = () => {
        setFilterByDate(!filterByDate)
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilteredWorkout(event.target.value)

    }


    exerciseTypesByIdMap
    workoutByIdMap

    const filterWorkout = () => {
        // if (exerciseTypes.hasOwnProperty(filteredWorkout) && workoutOne.get('exercises').includes(exerciseTypes[filteredWorkout].name)) {
        //     setDisplayedWorkout(workoutOne)
        // }



        setDisplayedWorkout(userPermittedActions.getWorkout(filteredWorkout))





        // if (exerciseTypes.deadlift.muscleGroups.includes(filteredWorkout) && workoutOne.get('exercises').includes(exerciseTypes.deadlift.name)) {
        //     setDisplayedWorkout(workoutOne)
        // }

        // if (exerciseTypes.benchPress.muscleGroups.includes(filteredWorkout) && workoutOne.get('exercises').includes(exerciseTypes.benchPress.name)) {
        //     setDisplayedWorkout(workoutOne)
        // }

        // if (exerciseTypes.squat.muscleGroups.includes(filteredWorkout) && workoutOne.get('exercises').includes(exerciseTypes.squat.name)) {
        //     setDisplayedWorkout(workoutOne)
        // }
    }

    const filterWorkoutByDate = () => {
        workoutOne.get('date').map((date: number | string) => {
            if (dayjs(date).format('DD/MM/YYYY') === dayjs(filteredWorkout).format('DD/MM/YYYY')) {
                setDisplayedWorkout(workoutOne)
            }
        })
    }

    return (
        <div>
            <div className="flex flex-col items-center p-1">
                <span className="p-1">Search workout</span>
                {filterByDate ?
                    <div>
                        <input type="date" onChange={handleOnChange}></input>
                        <button onClick={filterWorkoutByDate} className="p-1 border rounded border-red-700 mt-1">Search</button>
                        <button onClick={toggleDateSearchButton} className="p-1 border rounded border-red-700 mt-1">Search via text</button>
                    </div>
                    :
                    <div>
                        <input onChange={handleOnChange}></input>
                        <button onClick={filterWorkout} className="p-1 border rounded border-red-700 mt-1">Search</button>
                        <button onClick={toggleDateSearchButton} className="p-1 border rounded border-red-700 mt-1">Search via date</button>
                    </div>}
            </div>

            <div className="p-1 flex">
                {
                    displayedWorkout && displayedWorkout != undefined &&
                    <div className="p-1 flex flex-col border rounder rounded-sm">
                        <span>Exercises:</span>
                        {displayedWorkout.exercises.map((exercise: string) => {
                            return (
                                <div key={exercise.length} className="p-1">
                                    <span className="p-1">{exercise}</span>
                                </div>
                            )
                        })}
                        <span>Date</span>
                        <span className="p-1">{dayjs(Number(displayedWorkout.date)).format('DD/MM/YYYY')}</span>
                        <button className="p-1 border rounded border-red-700" onClick={() => navigate(`edit/${workoutOne.get('id')}`)}>Edit workout</button>
                        <button className="p-1 border rounded border-red-700" onClick={() => navigate(`edit/${workoutOne.get('id')}`)}>Duplicate workout</button>
                    </div>
                }
            </div>
        </div>
    )
}