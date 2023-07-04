import { useNavigate, useParams } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ROUTE_PATH } from "../util/urls"
import { userPermittedActions } from "../api/userPermittedActions"


const updateExerciseSchema = z.object({
    exerciseName: z.string().nonempty({ message: 'Exercise Name  required!' }),
    muscleGroups: z.string().nonempty({ message: 'Muscle Groups required!' })
})

type UpdateExerciseSchemaType = z.infer<typeof updateExerciseSchema>


export default function ExerciseLibraryEditExercise() {

    const { exercise_id } = useParams()

    const navigate = useNavigate()

    const exerciseById = userPermittedActions.getExerciseType(Number(exercise_id))

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateExerciseSchemaType>({ resolver: zodResolver(updateExerciseSchema) })

    const onSubmit: SubmitHandler<UpdateExerciseSchemaType> = (data) => {
        if (exerciseById) {
            userPermittedActions.updateExerciseTypeById(exerciseById.id, data)
            navigate(ROUTE_PATH.EXERCISE_LIBRARY)
        }
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center p-1">
            <div className="p-1">
                <span className="p-1">Exercise Name</span>
                <input {...register('exerciseName')} placeholder={exerciseById?.name} className="p-1"></input>
                {errors.exerciseName && <p className='text-red-500 p-1'>{errors.exerciseName.message}</p>}

            </div>
            <div className="p-1">
                <span className="p-1">Exercise Target Muscles</span>
                <input {...register('muscleGroups')} placeholder={exerciseById?.muscleGroups.join(', ')} className="p-1"></input>
                {errors.muscleGroups && <p className='text-red-500 p-1'>{errors.muscleGroups.message}</p>}

            </div>
            <div>
                <button className="p-1 border rounded-md border-red-400">Update Exercise</button>
            </div>
        </form>)
}