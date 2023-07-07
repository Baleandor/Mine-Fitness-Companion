import { useLocation, useNavigate, useParams } from "react-router-dom"
import { userPermittedActions } from "../api/userPermittedActions"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ROUTE_PATH } from "../util/urls"
import { z } from "zod"
import dayjs from "dayjs"



const editWorkoutSchema = z.object({
    exercises: z.string().nonempty({ message: 'Exercises required!' }),
    date: z.date({ required_error: "A date is required!" })
})

type EditWorkoutSchemaType = z.infer<typeof editWorkoutSchema>


export default function WorkoutEdit() {

    const { id } = useParams()

    const navigate = useNavigate()

    const { state } = useLocation()

    const selectedWorkout = userPermittedActions.getWorkout(Number(id))
    

    const { register, handleSubmit, formState: { errors } } = useForm<EditWorkoutSchemaType>({
        resolver: zodResolver(editWorkoutSchema), defaultValues: {
            exercises: selectedWorkout.exercises.toString(),
            date: state ? '' : selectedWorkout.date
        }
    })

    const onSubmit: SubmitHandler<EditWorkoutSchemaType> = (data) => {

        const { exercises, date } = data
        if (state) {
            const updatedWorkoutData = {
                exercises: exercises.split(','),
                date: dayjs(date).valueOf(),
            }
            userPermittedActions.createWorkout(updatedWorkoutData)

        } else {
            const updatedWorkoutData = {
                exercises: exercises.split(','),
                date: dayjs(date).valueOf(),
                id: Number(id)
            }
            userPermittedActions.updateWorkout(updatedWorkoutData)
        }

        navigate(ROUTE_PATH.USER_PROFILE)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center p-1">
            <div className="p-1">
                <span className="p-1">Exercises</span>
                <input {...register('exercises')} className="p-1" ></input>
                {errors.exercises && <p className='text-red-500 p-1'>{errors.exercises.message}</p>}
            </div>
            <div className="p-1">
                <span className="p-1">Date</span>
                <input type="date" {...register('date', { valueAsDate: true })} className="p-1"></input>
                {errors.date && <p className='text-red-500 p-1'>{errors.date.message}</p>}
            </div>
            <div>
                <button className="p-1 border rounded-md border-red-400">Update Workout</button>
            </div>
        </form>
    )
}