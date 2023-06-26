import { useNavigate, useParams } from "react-router-dom"
import { exerciseTypes } from "../mockBackend/exerciseType"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"


const UpdateExerciseSchema = z.object({
    exerciseName: z.string().nonempty({ message: 'Exercise Name  required!' }),
    muscleGroups: z.string().nonempty({ message: 'Muscle Groups required!' })
})

type UpdateExerciseSchemaType = z.infer<typeof UpdateExerciseSchema>


export default function ExerciseLibraryEditExercise() {

    const { exercise_id } = useParams()

    const navigate = useNavigate()

    let currentExerciseToEdit

    for (let exercise in exerciseTypes) {

        if (exerciseTypes[exercise].id === Number(exercise_id)) {
            currentExerciseToEdit = exerciseTypes[exercise]
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateExerciseSchemaType>({ resolver: zodResolver(UpdateExerciseSchema) })

    const onSubmit: SubmitHandler<UpdateExerciseSchemaType> = (data) => {
        currentExerciseToEdit.name = data.exerciseName
        currentExerciseToEdit.muscleGroups = [data.muscleGroups.toLowerCase()]
        navigate('/exercise-library')
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center p-1">
            <div className="p-1">
                <span className="p-1">Exercise Name</span>
                <input {...register('exerciseName')} placeholder={currentExerciseToEdit.name} className="p-1"></input>
                {errors.exerciseName && <p className='text-red-500 p-1'>{errors.exerciseName.message}</p>}

            </div>
            <div className="p-1">
                <span className="p-1">Exercise Target Muscles</span>
                <input {...register('muscleGroups')} placeholder={currentExerciseToEdit.muscleGroups} className="p-1"></input>
                {errors.muscleGroups && <p className='text-red-500 p-1'>{errors.muscleGroups.message}</p>}

            </div>
            <div>
                <button className="p-1 border rounded-md border-red-400">Update Exercise</button>
            </div>
        </form>)
}