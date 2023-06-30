import { useState } from "react"
import { exerciseTypes } from "../mockBackend/exerciseType"
import { useNavigate } from "react-router-dom"






export default function ExerciseLibrary() {

    const [searchParams, setSearchParams] = useState('')

    const [searchResult, setSearchResult] = useState([])

    const navigate = useNavigate()

    let user = localStorage.getItem('user')
    // user = JSON.parse(user)


    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams(event.target.value.toLocaleLowerCase())
    }

   

    const search = () => {
        const search = []
        for (let key in exerciseTypes) {
            if (searchParams.includes(exerciseTypes[key].name.toLocaleLowerCase())) {
                search.push(exerciseTypes[key])
            }
            if (exerciseTypes[key].muscleGroups.includes(searchParams)) {
                search.push(exerciseTypes[key])
            }
        }
        setSearchResult(search)
    }

    return (
        <div className="flex flex-col items-center p-2">
            <div>
                <span className="p-1">Search Exercise</span>
                <input type="search" onChange={handleOnChange} className="p-1" ></input>
                <button onClick={search} className="p-1 border border-red-400 rounded-md">Find</button>
            </div>
            <div className="p-1">
                {searchResult.length > 0 && searchResult.map((result) => {
                    return (
                        <div key={result.id}>
                            <span >{result.name}</span>
                            <span className="ml-2">{result.muscleGroups.join(" ")}</span>
                            {user && user.name === 'Jotaro' ? <button className="p-1 border border-red-400 rounded-md" onClick={() => navigate(`edit/${result.id}`)}>Edit</button> : ''}
                        </div>
                    )
                })}

            </div>
        </div>
    )
}