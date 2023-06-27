import { useParams } from "react-router-dom"







export default function EditWorkout() {

    console.log('we are here')

    const { workout_id } = useParams()










    return (
        <div>
            yare  {workout_id}
        </div>
    )
}