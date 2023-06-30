import { zodResolver } from "@hookform/resolvers/zod"
import z from 'zod'
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { userOne } from "../mockBackend/users"
import RHFDatePicker from "../components/RHFDatePicker"
import { ROUTE_PATH } from "../util/urls"

enum GenderOptions {
    'male',
    'female'
}

const UpdateUserBasicInfoSchema = z.object({
    name: z.string({ required_error: 'Name is required!' }).min(4, 'Name must be at least 4 characters long!'),
    email: z.string({ required_error: 'Email is required!' }).email({ message: 'Enter a valid email!' }),
    currentPassword: z.string().min(1, { message: 'You must enter your current password!' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long!' }),
    repass: z.string().min(6, { message: 'Password must be at least 6 characters long!' }),
    gender: z.string().min(1, "You must select a gender!"),
    dateOfBirth: z.number({ required_error: "A date of birth is required!" }),
    height: z.number({ invalid_type_error: "You must enter a number" }).min(145, 'You must be at least 145 tall to join the gym!')
}).refine(
    (data) => data.currentPassword === userOne.get('password'), {
    message: 'Incorrect current password',
    path: ['currentPassword']
}
).refine(
    (data) => data.password === data.repass, {
    message: "Passwords must match!",
    path: ["repass"]
}
)


type UpdateUserBasicInfoType = z.infer<typeof UpdateUserBasicInfoSchema>


export default function UpdateUserBasicInfo() {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, control } = useForm<UpdateUserBasicInfoType>({ resolver: zodResolver(UpdateUserBasicInfoSchema) })

    const onSubmit: SubmitHandler<UpdateUserBasicInfoType> = (data) => {
        const { name, email, password, gender, dateOfBirth, height } = data
        const updateData = { name, email, password, gender, dateOfBirth, height }

        for (let key in updateData) {
            userOne.set(key, updateData[key])
        }
        console.log(userOne)
        navigate(ROUTE_PATH.USER_PROFILE)
    }


    return (
        <form className="flex flex-col p-1 justify-center content-center flex-wrap" onSubmit={handleSubmit(onSubmit)}>
            <div className='p-1 flex flex-col'>
                <span>Update Basic Info</span>
            </div>
            <div className='p-1 flex flex-col'>
                <span>Name</span>
                <input {...register('name')}></input>
                {errors.name && <p className='text-red-500 p-1'>{errors.name.message}</p>}
            </div>
            <div className='p-1 flex flex-col'>
                <span>Email</span>
                <input  {...register('email')}></input>
                {errors.email && <p className='text-red-500 p-1'>{errors.email.message}</p>}
            </div>
            <div className='p-1 flex flex-col'>
                <span>Update Password</span>
                <span>Current Password</span>
                <input  {...register('currentPassword')} type="password"></input>
                {errors.currentPassword && <p className='text-red-500 p-1'>{errors.currentPassword.message}</p>}
                <span>New Password</span>
                <input  {...register('password')} type="password"></input>
                {errors.password && <p className='text-red-500 p-1'>{errors.password.message}</p>}
                <span>Repeat Password</span>
                <input  {...register('repass')} type="password"></input>
                {errors.repass && <p className='text-red-500 p-1'>{errors.repass.message}</p>}
            </div>
            <div className='p-1 flex flex-col'>
                <label>Gender</label>
                <select  {...register('gender')} >
                    <option value={''}>Select Gender</option>
                    <option value={GenderOptions[0]}>Male</option>
                    <option value={GenderOptions[1]}>Female</option>
                </select>
                {errors.gender && <p className='text-red-500 p-1'>{errors.gender.message}</p>}
            </div>
            <div className='p-1 flex flex-col'>
                <label>Date Of Birth</label>
                <RHFDatePicker control={control} name="dateOfBirth" />

                {errors.dateOfBirth && <p className='text-red-500 p-1'>{errors.dateOfBirth.message}</p>}
            </div>
            <div className='p-1 flex flex-col'>
                <label>Height in cm</label>
                <input type='number' {...register('height', { valueAsNumber: true })}></input>
                {errors.height && <p className='text-red-500 p-1'>{errors.height.message}</p>}

            </div>
            <div className='p-1 flex flex-col'>
                <button className="p-1 border rounded border-red-700">Update Info</button>
            </div>
        </form>
    )
}