import { useNavigate, useParams } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ROUTE_PATH } from "../util/urls"
import { useGetExerciseByIdQuery, useUpdateExerciseByIdMutation } from "../redux/exerciseApi"


const updateExerciseSchema = z.object({
    exerciseName: z.string().nonempty({ message: 'Exercise Name  required!' }),
    muscleGroups: z.string().nonempty({ message: 'Muscle Groups required!' })
})

type UpdateExerciseSchemaType = z.infer<typeof updateExerciseSchema>


export default function ExerciseLibraryEditExercise() {

    const { exercise_id } = useParams()

    const navigate = useNavigate()

    const { data: exerciseId } = useGetExerciseByIdQuery(exercise_id)

    const [updateExerciseById] = useUpdateExerciseByIdMutation()

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateExerciseSchemaType>({ resolver: zodResolver(updateExerciseSchema) })

    const onSubmit: SubmitHandler<UpdateExerciseSchemaType> = (data) => {
        if (exerciseId) {
            const updatedData = { id: exerciseId.id, ...data }
            updateExerciseById(updatedData)
            navigate(ROUTE_PATH.EXERCISE_LIBRARY)
        }
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center p-1">
            <div className="p-1">
                <span className="p-1">Exercise Name</span>
                <input {...register('exerciseName')} placeholder={exerciseId?.name} className="p-1"></input>
                {errors.exerciseName && <p className='text-red-500 p-1'>{errors.exerciseName.message}</p>}

            </div>
            <div className="p-1">
                <span className="p-1">Exercise Target Muscles</span>
                <input {...register('muscleGroups')} placeholder={exerciseId?.muscleGroups.join(', ')} className="p-1"></input>
                {errors.muscleGroups && <p className='text-red-500 p-1'>{errors.muscleGroups.message}</p>}

            </div>
            <div>
                <button className="p-1 border rounded-md border-red-400">Update Exercise</button>
            </div>
        </form>)
}