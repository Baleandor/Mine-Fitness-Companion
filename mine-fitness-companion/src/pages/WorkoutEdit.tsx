import { useLocation, useNavigate, useParams } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ROUTE_PATH } from "../util/urls"
import { z } from "zod"
import RHFDatePicker from "../components/RHFDatePicker"
import { useEffect } from "react"
import { useCreateWorkoutMutation, useGetWorkoutByIdQuery, useUpdateWorkoutMutation } from "../redux/workoutsApi"
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'



const editWorkoutSchema = z.object({
    exercises: z.string().nonempty({ message: 'Exercises required!' }),
    date: z.string({ required_error: "A date is required!" })
})

type EditWorkoutSchemaType = z.infer<typeof editWorkoutSchema>


export default function WorkoutEdit() {

    dayjs.extend(customParseFormat)

    const { id } = useParams()

    const navigate = useNavigate()

    const { state } = useLocation()

    const { data: workoutById } = useGetWorkoutByIdQuery(id)

    const [updateWorkout] = useUpdateWorkoutMutation()

    const [createWorkout] = useCreateWorkoutMutation()

    useEffect(() => {
        // if (workoutById != undefined) {
        //     if (state) {
        //         setValue("exercises", workoutById[0].exercises.join(', '))
        //     } else {
        //         setValue("exercises", workoutById[0].exercises.toString())

        //         setValue("date", workoutById[0].date)
        //     }
        // }
        //IT DUN MATTER IF I USE SETVALUE OR DEFAULTVALUE

    }, [])



    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<EditWorkoutSchemaType>({
        resolver: zodResolver(editWorkoutSchema), defaultValues: {
            exercises: workoutById && workoutById[0]?.exercises.toString(),
            date: state ? undefined : workoutById && dayjs(workoutById[0]?.date).format('DD/MM/YYYY')
        }
    })

    const onSubmit: SubmitHandler<EditWorkoutSchemaType> = (data) => {
        try {
            const { exercises, date } = data
            if (state) {
                const updatedWorkoutData = {
                    exercises: exercises.split(','),
                    date: dayjs(date, 'DD/MM/YYYY').valueOf(),
                }
                createWorkout(updatedWorkoutData)

            } else {
                const updatedWorkoutData = {
                    exercises: exercises.split(','),
                    date: dayjs(date, 'DD/MM/YYYY').valueOf(),
                    id: id
                }

                updateWorkout(updatedWorkoutData)
            }
            navigate(ROUTE_PATH.WORKOUTS)

        } catch (error) {
            throw new Error(error)
        }
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
                <RHFDatePicker control={control} name="date" />
                {errors.date && <p className='text-red-500 p-1'>{errors.date.message}</p>}
            </div>
            <div>
                <button className="p-1 border rounded-md border-red-400">{state ? 'Duplicate Workout' : 'Update Workout'}</button>
            </div>
        </form>
    )
}