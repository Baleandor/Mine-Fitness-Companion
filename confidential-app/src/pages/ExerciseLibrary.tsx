import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/hooks"
import { userPermittedActions } from "../api/userPermittedActions"
import { ROUTE_PATH } from "../util/urls"


export default function ExerciseLibrary() {

    const [searchParams, setSearchParams] = useState('')

    const [searchResult, setSearchResult] = useState<string[]>([])

    const navigate = useNavigate()

    const user = useAppSelector((state) => state.auth.user)

    const allExerciseTypes = userPermittedActions.getAllExerciseTypes()

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams(event.target.value.toLocaleLowerCase())
    }

    const findExercise = () => {
        const search = []
        for (let exerciseType of allExerciseTypes) {
            if (searchParams.includes(exerciseType.name)) {
                search.push(exerciseType)
            }
            if (exerciseType.muscleGroups.includes(searchParams)) {
                search.push(exerciseType)
            }
        }
        setSearchResult(search)
    }

    const onDelete = (id: number) => {
        userPermittedActions.deleteExerciseTypeById(Number(id))
    }

    return (
        <div className="flex flex-col items-center p-2">
            <div>
                <span className="p-1">Search Exercise</span>
                <input type="search" onChange={handleOnChange} className="p-1" ></input>
                <button onClick={findExercise} className="p-1 border border-red-400 rounded-md">Find</button>
                <button className="ml-2 p-1 border border-red-400 rounded-md" onClick={() => navigate(ROUTE_PATH.EXERCISE_LIBRARY_CREATE_EXERCISE_TYPE)}>Create Exercise Type</button>
            </div>
            <div className="p-1">
                {searchResult.length > 0 && searchResult.map((result) => {
                    return (
                        <div className="border rounded-md border-blue-700 mb-1 p-1" key={result.id}>
                            <span >{result.name}:</span>
                            {result.muscleGroups.length > 1 ?
                                < span className="ml-2">{result.muscleGroups.join(" ")}</span> :
                                <span className="ml-2">{result.muscleGroups}</span>}
                            {user && user.role === 'admin' ? <>
                                <button className="p-1 ml-1 border border-red-400 rounded-md" onClick={() => navigate(`edit/${result.id}`)}>Edit</button>
                                <button className="p-1 ml-1 border border-red-400 rounded-md" onClick={() => onDelete(result.id)}>Delete</button>
                            </> : ''}
                        </div>
                    )
                })}
            </div>
        </div >
    )
}