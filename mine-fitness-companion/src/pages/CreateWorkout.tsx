import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../util/urls";
import RHFDatePicker from "../components/RHFDatePicker";
import { useCreateWorkoutMutation } from "../redux/workoutsApi";
import customParseFormat from 'dayjs/plugin/customParseFormat'


const createWorkoutSchema = z.object({
    exercises: z.string().nonempty({ message: 'Exercises required!' }),
    date: z.string({ required_error: "A date is required!" })
})

type createWorkoutSchemaType = z.infer<typeof createWorkoutSchema>

export default function CreateWorkout() {
    dayjs.extend(customParseFormat)

    const navigate = useNavigate()

    const [createWorkout] = useCreateWorkoutMutation()

    const { register, handleSubmit, formState: { errors }, control } = useForm<createWorkoutSchemaType>({ resolver: zodResolver(createWorkoutSchema) })
    const onSubmit: SubmitHandler<createWorkoutSchemaType> = (data) => {
        const { exercises, date } = data
        const createWorkoutData = {
            exercises: exercises.split(','),
            date: dayjs(date, 'DD/MM/YYYY').valueOf()
        }


        createWorkout(createWorkoutData).then(() => navigate(ROUTE_PATH.WORKOUTS))

    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <div className="p-1">
                <span className="p-1">Exercises</span>
                <input {...register('exercises')} className="p-1"></input>
                {errors.exercises && <p className='text-red-500 p-1'>{errors.exercises.message}</p>}
            </div>
            <div className="p-1">
                <span className="p-1">Date</span>
                <RHFDatePicker control={control} name="date" />
                {errors.date && <p className='text-red-500 p-1'>{errors.date.message}</p>}
            </div>
            <button className="p-1 border rounded border-red-700">Create Workout</button>
        </form>
    )
}