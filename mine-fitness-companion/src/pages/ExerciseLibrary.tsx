import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../util/urls"
import { useDeleteExerciseMutation, useGetAllExercisesQuery } from "../redux/exerciseApi"
import { supabase } from "../util/supabase"
import { skipToken } from "@reduxjs/toolkit/dist/query"



const { data: user } = await supabase.auth.getUser()

export default function ExerciseLibrary() {
    const userRole = user.user?.user_metadata.role

    const [searchParams, setSearchParams] = useState('')

    const [searchResult, setSearchResult] = useState<{ id: string; name: string; muscle_groups: string[] }[]>([])

    const [showResults, setShowResults] = useState(true)

    const navigate = useNavigate()


    const { data } = useGetAllExercisesQuery(user ?? skipToken)

    const [deleteExercise] = useDeleteExerciseMutation()

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams(event.target.value.toLocaleLowerCase())
    }

    const findExercise = () => {
        const search: { id: string; name: string; muscle_groups: string[] }[] = []

        data?.forEach((exercise) => {
            if (searchParams.toLocaleLowerCase() === exercise.name.toLocaleLowerCase()) {
                search.push(exercise)
            }
            if (exercise.muscle_groups.includes(searchParams)) {
                search.push(exercise)
            }
        })

        if (search.length >= 1) {
            setSearchResult(search)
        } else {
            setShowResults(false)
            setSearchResult([])
        }
    }


    const onDelete = (id: string) => {
        deleteExercise(id)
    }


    return (
        <div className="flex flex-col items-center p-2">
            <div>
                <span className="p-1">Search Exercise</span>
                <input type="search" onChange={handleOnChange} className="p-1" ></input>
                <button onClick={findExercise} className="p-1 border border-red-400 rounded-md">Search</button>
                {user && userRole === 'admin' &&
                    <button className="ml-2 p-1 border border-red-400 rounded-md" onClick={() => navigate(ROUTE_PATH.EXERCISE_LIBRARY_CREATE_EXERCISE_TYPE)}>Create Exercise</button>
                }
            </div>
            <div className="p-1">
                {searchResult && searchResult.length > 0 ? searchResult.map((result) => {
                    return (
                        <div className="border rounded-md border-blue-700 mb-1 p-1" key={result.id}>
                            <span >{result.name}:</span>
                            {result.muscle_groups.length > 1 ?
                                < span className="ml-2">{result.muscle_groups.join(", ")}</span> :
                                <span className="ml-2">{result.muscle_groups}</span>}
                            {user && userRole === 'admin' && <>
                                <button className="p-1 ml-1 border border-red-400 rounded-md" onClick={() => navigate(`edit/${result.id}`)}>Edit</button>
                                <button className="p-1 ml-1 border border-red-400 rounded-md" onClick={() => onDelete(result.id)}>Delete</button>
                            </>}
                        </div>
                    )
                }) :
                    !showResults && <div className="p-1">No results found!</div>}
            </div>
        </div >
    )
}