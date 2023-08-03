import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/hooks"
import { ROUTE_PATH } from "../util/urls"
import { useDeleteExerciseMutation, useGetAllExercisesQuery } from "../redux/exerciseApi"


export default function ExerciseLibrary() {

    const [searchParams, setSearchParams] = useState('')

    const [searchResult, setSearchResult] = useState<{ id: number; name: string; muscleGroups: string[] }[]>([])

    const [showResults, setShowResults] = useState(true)

    const navigate = useNavigate()

    const user = useAppSelector((state) => state.auth.user)

    const { data } = useGetAllExercisesQuery(user)

    const [deleteExercise] = useDeleteExerciseMutation()

    useEffect(() => {
        setSearchResult(data)
    }, [data])

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams(event.target.value.toLocaleLowerCase())
    }

    const findExercise = () => {
        const search = []
        for (let exerciseType of data) {
            if (searchParams.includes(exerciseType.name)) {
                search.push(exerciseType)
            }
            if (exerciseType.muscleGroups.includes(searchParams)) {
                search.push(exerciseType)
            }
        }
        if (search.length > 1) {
            setSearchResult(search)
        } else {
            setShowResults(false)
            setSearchResult([])
        }
    }

    const onDelete = (id: number) => {
        deleteExercise(Number(id))
    }

    return (
        <div className="flex flex-col items-center p-2">
            <div>
                <span className="p-1">Search Exercise</span>
                <input type="search" onChange={handleOnChange} className="p-1" ></input>
                <button onClick={findExercise} className="p-1 border border-red-400 rounded-md">Filter</button>
                <button className="ml-2 p-1 border border-red-400 rounded-md" onClick={() => navigate(ROUTE_PATH.EXERCISE_LIBRARY_CREATE_EXERCISE_TYPE)}>Create Exercise Type</button>
            </div>
            <div className="p-1">
                {searchResult && searchResult.length > 0 ? searchResult.map((result) => {
                    return (
                        <div className="border rounded-md border-blue-700 mb-1 p-1" key={result.id}>
                            <span >{result.name}:</span>
                            {result.muscleGroups.length > 1 ?
                                < span className="ml-2">{result.muscleGroups.join(", ")}</span> :
                                <span className="ml-2">{result.muscleGroups}</span>}
                            {user && user.role === 'admin' && <>
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