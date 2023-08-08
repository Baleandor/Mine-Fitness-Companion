import { useNavigate } from "react-router-dom"
import dayjs, { Dayjs } from "dayjs"
import { useEffect, useState } from "react"
import DateSearchPicker from "../components/DateSearchPicker"
import { useDeleteWorkoutMutation, useFilterQuery, useFilterViaDateQuery, useGetAllWorkoutsQuery } from "../redux/workoutsApi"
import { useAppSelector } from "../hooks/hooks"
import { skipToken } from "@reduxjs/toolkit/dist/query"



export default function Workouts() {

    const isUserLoggedIn = useAppSelector((state) => state.isLoggedIn)

    const navigate = useNavigate()

    const [filteredWorkout, setFilteredWorkout] = useState<string>('')

    const [displayedWorkouts, setDisplayedWorkouts] = useState<any[]>([])

    const [filterByDate, setFilterByDate] = useState(false)

    const { data } = useGetAllWorkoutsQuery(isUserLoggedIn)

    const { data: filteredWorkoutData } = useFilterQuery(filteredWorkout ?? skipToken)

    const { data: filteredViaDateWorkout } = useFilterViaDateQuery(filteredWorkout ?? skipToken)

    const [deleteWorkout] = useDeleteWorkoutMutation()

    useEffect(() => {
        setDisplayedWorkouts(data)
    }, [data])


    const [duplicate] = useState(true)

    const toggleDateSearchButton = () => {
        setFilterByDate(!filterByDate)
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilteredWorkout(event.target.value)
    }

    const filterWorkout = () => {
        if (filterByDate) {
            filteredWorkout && setDisplayedWorkouts(filteredViaDateWorkout)

        } else {

            filteredWorkout && setDisplayedWorkouts(filteredWorkoutData)
        }
    }

    const handleDateChange = (values: Dayjs | null) => {
        const newSearchDate = dayjs(values).format('DD/MM/YYYY')
        setFilteredWorkout(newSearchDate)
    }

    const onDelete = (id: number) => {
        deleteWorkout(id)
    }


    return (
        <div>
            <div className="flex flex-col items-center p-1">
                <span className="p-1">Search workout</span>
                {filterByDate ?
                    <div>
                        <DateSearchPicker handleDateChange={handleDateChange} />
                        <button onClick={filterWorkout} className="p-1 border rounded border-red-700 mt-1">Search</button>
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
                    (displayedWorkouts?.length > 0) && data != undefined ?
                        <div className="p-1 flex">
                            {displayedWorkouts.map((workout: { id: number; exercises: string[]; date: number }) => {
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
                        : <div>No workouts found!</div>
                }
            </div>
        </div>
    )
}