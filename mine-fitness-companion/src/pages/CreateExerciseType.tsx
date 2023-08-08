import { useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ROUTE_PATH } from "../util/urls"
import { useCreateExerciseMutation } from "../redux/exerciseApi"


const createExerciseSchema = z.object({
    exerciseName: z.string().nonempty({ message: 'Exercise Name  required!' }),
    muscleGroups: z.string().nonempty({ message: 'Muscle Groups required!' })
})

type CreateExerciseSchemaType = z.infer<typeof createExerciseSchema>


export default function CreateExerciseType() {

    const navigate = useNavigate()

    const [createExercise] = useCreateExerciseMutation()

    const { register, handleSubmit, formState: { errors } } = useForm<CreateExerciseSchemaType>({ resolver: zodResolver(createExerciseSchema) })

    const onSubmit: SubmitHandler<CreateExerciseSchemaType> = (data) => {
        try {
            const { exerciseName, muscleGroups } = data
            const createExerciseData = {
                name: exerciseName,
                muscle_groups: [muscleGroups]
            }
            createExercise(createExerciseData).then(() => navigate(ROUTE_PATH.EXERCISE_LIBRARY))

        } catch (error) {
            throw new Error(error)
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center p-1">
            <div className="p-1">
                <span className="p-1">Exercise Name</span>
                <input {...register('exerciseName')} placeholder='Exercise Name' className="p-1"></input>
                {errors.exerciseName && <p className='text-red-500 p-1'>{errors.exerciseName.message}</p>}
            </div>
            <div className="p-1">
                <span className="p-1">Exercise Target Muscles</span>
                <input {...register('muscleGroups')} placeholder='Affected Muscle Groups' className="p-1"></input>
                {errors.muscleGroups && <p className='text-red-500 p-1'>{errors.muscleGroups.message}</p>}
            </div>
            <div>
                <button className="p-1 border rounded-md border-red-400">Create Exercise</button>
            </div>
        </form>)
}