import z from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from "react-router-dom"
import RHFDatePicker from "../components/RHFDatePicker"
import { ROUTE_PATH } from '../util/urls'
import { userPermittedActions } from '../api/userPermittedActions'


const updateMeasurementsSchema = z.object({
    imageUrl: z.string().url({ message: 'You must provide a valid link!' }),
    weight: z.number({ invalid_type_error: "You must provide a valid number" }),
    chest: z.number({ invalid_type_error: "You must provide a valid number" }),
    waist: z.number({ invalid_type_error: "You must provide a valid number" }),
    hips: z.number({ invalid_type_error: "You must provide a valid number" }),
    biceps: z.number({ invalid_type_error: "You must provide a valid number" }),
    date: z.number({ required_error: "A date is required!" })
})

type UpdateMeasurementsFormType = z.infer<typeof updateMeasurementsSchema>


export default function UpdateMeasurements() {


    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, control } = useForm<UpdateMeasurementsFormType>({ resolver: zodResolver(updateMeasurementsSchema) })

    const onSubmit: SubmitHandler<UpdateMeasurementsFormType> = (data) => {
        userPermittedActions.addUserMeasurements(data)
        navigate(ROUTE_PATH.USER_PROFILE)
    }


    return (

        <form className="flex flex-col p-1 justify-center content-center flex-wrap" onSubmit={handleSubmit(onSubmit)}>
            <div className="p-1">
                <span>Update Progress</span>
            </div>
            <div className="p-1">
                <span>Image URL</span>
                <input {...register('imageUrl')}></input>
                {errors.imageUrl && <p className='text-red-500 p-1'>{errors.imageUrl.message}</p>}
            </div>
            <div className="p-1">
                <span>Weight:</span>
                <input  {...register('weight', { valueAsNumber: true })}></input>
                {errors.weight && <p className='text-red-500 p-1'>{errors.weight.message}</p>}
            </div>
            <div className="p-1">
                <span>Chest:</span>
                <input  {...register('chest', { valueAsNumber: true })}></input>
                {errors.chest && <p className='text-red-500 p-1'>{errors.chest.message}</p>}
            </div>
            <div className="p-1">
                <span>Waist:</span>
                <input  {...register('waist', { valueAsNumber: true })}></input>
                {errors.waist && <p className='text-red-500 p-1'>{errors.waist.message}</p>}
            </div>
            <div className="p-1">
                <span>Hips:</span>
                <input  {...register("hips", { valueAsNumber: true })}></input>
                {errors.hips && <p className='text-red-500 p-1'>{errors.hips.message}</p>}
            </div>
            <div className="p-1">
                <span>Biceps:</span>
                <input  {...register('biceps', { valueAsNumber: true })}></input>
                {errors.biceps && <p className='text-red-500 p-1'>{errors.biceps.message}</p>}
            </div>
            <div className="p-1">
                <span>Date:</span>
                <RHFDatePicker control={control} name="date" />
                {errors.date && <p className='text-red-500 p-1'>{errors.date.message}</p>}

            </div>
            <div className="p-1">
                <button className="p-1 border rounded border-red-700">Update Measurements</button>
            </div>
        </form>

    )
}