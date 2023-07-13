import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { useState } from "react"
import { userPermittedActions } from "../backend/userPermittedActions"
import { ROUTE_PATH } from "../util/urls"



export default function Workouts() {

    const navigate = useNavigate()

    const [filteredWorkout, setFilteredWorkout] = useState<string>()

    const [displayedWorkout, setDisplayedWorkout] = useState<any>()

    const [filterByDate, setFilterByDate] = useState(false)

    const [duplicate] = useState(true)

    const toggleDateSearchButton = () => {
        setFilterByDate(!filterByDate)
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilteredWorkout(event.target.value)
    }

    const filterWorkout = () => {
        filteredWorkout && setDisplayedWorkout(userPermittedActions.getMatchingWorkouts(filteredWorkout))
    }

    const filterWorkoutByDate = () => {
        filteredWorkout && setDisplayedWorkout(userPermittedActions.getMatchingWorkouts(filteredWorkout))
    }

    const onDelete = (id: number) => {
        userPermittedActions.deleteWorkoutById(id)
        navigate(ROUTE_PATH.USER_PROFILE)
    }


    return (
        <div>
            <div className="flex flex-col items-center p-1">
                <span className="p-1">Search workout</span>
                {filterByDate ?
                    <div>
                        <input type="date" onChange={handleOnChange}></input>
                        <button onClick={filterWorkoutByDate} className="p-1 border rounded border-red-700 mt-1">Search</button>
                        <button onClick={toggleDateSearchButton} className="p-1 border rounded border-red-700 ml-1">Search via text</button>
                    </div>
                    :
                    <div>
                        <input onChange={handleOnChange}></input>
                        <button onClick={filterWorkout} className="p-1 border rounded border-red-700 mt-1">Search</button>
                        <button onClick={toggleDateSearchButton} className="p-1 border rounded border-red-700 ml-1">Search via date</button>
                    </div>}
                <button className="p-1 border rounded border-red-700 mt-1" onClick={() => navigate('create')}>Create Workout</button>
            </div>

            <div className="p-1">
                <div className="p-1">Workouts:</div>
                {
                    displayedWorkout && displayedWorkout != undefined &&
                    <div className="p-1 flex">
                        {displayedWorkout.map((workout: { id: number; exercises: string[]; date: number }) => {

                            return (
                                <div key={workout.id} className="p-1 flex flex-col border rounder rounded-sm mr-1">
                                    <span>Exercises:</span>
                                    {workout.exercises.map((exercise: string) => {
                                        return <span key={exercise.length} className="p-1">{exercise}</span>
                                    })}
                                    <span>Date:</span>
                                    <span className="p-1">{dayjs(Number(workout.date)).format('DD/MM/YYYY')}</span>
                                    <button className="p-1 border rounded border-red-700 mb-1" onClick={() => navigate(`edit/${workout.id}`)}>Edit workout</button>
                                    <button className="p-1 border rounded border-red-700 mb-1" onClick={() => navigate(`edit/${workout.id}`, { state: duplicate })}>Duplicate workout</button>
                                    <button className="p-1 border rounded border-red-700" onClick={() => onDelete(workout.id)}>Delete workout</button>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}