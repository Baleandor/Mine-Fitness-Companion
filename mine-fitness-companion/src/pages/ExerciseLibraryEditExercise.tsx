import { useNavigate, useParams } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ROUTE_PATH } from "../util/urls"
import { useGetExerciseByIdQuery, useUpdateExerciseByIdMutation } from "../redux/exerciseApi"
import { skipToken } from "@reduxjs/toolkit/dist/query"


const updateExerciseSchema = z.object({
    exerciseName: z.string().nonempty({ message: 'Exercise Name  required!' }),
    muscleGroups: z.string().nonempty({ message: 'Muscle Groups required!' })
})

type UpdateExerciseSchemaType = z.infer<typeof updateExerciseSchema>


export default function ExerciseLibraryEditExercise() {

    const { exercise_id } = useParams()

    const navigate = useNavigate()

    const { data: exerciseId } = useGetExerciseByIdQuery(exercise_id ?? skipToken)



    const [updateExerciseById] = useUpdateExerciseByIdMutation()

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateExerciseSchemaType>({ resolver: zodResolver(updateExerciseSchema) })

    const onSubmit: SubmitHandler<UpdateExerciseSchemaType> = (data) => {
        if (exerciseId) {
            const updatedData = { id: exerciseId[0].id, exerciseName: data.exerciseName, muscleGroups: data.muscleGroups.split(',') }
            updateExerciseById(updatedData)
            navigate(ROUTE_PATH.EXERCISE_LIBRARY)
        }
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center p-1">
            <div className="p-1">
                <span className="p-1">Exercise Name</span>
                {exerciseId && exerciseId[0] && <input {...register('exerciseName')} placeholder={exerciseId[0].name} className="p-1"></input>}
                {errors.exerciseName && <p className='text-red-500 p-1'>{errors.exerciseName.message}</p>}
            </div>
            <div className="p-1">
                <span className="p-1">Exercise Target Muscles</span>
                {exerciseId && exerciseId[0] && <input {...register('muscleGroups')} placeholder={exerciseId[0].muscle_groups.join(', ')} className="p-1"></input>}
                {errors.muscleGroups && <p className='text-red-500 p-1'>{errors.muscleGroups.message}</p>}
            </div>
            <div>
                <button className="p-1 border rounded-md border-red-400">Update Exercise</button>
            </div>
        </form>)
}