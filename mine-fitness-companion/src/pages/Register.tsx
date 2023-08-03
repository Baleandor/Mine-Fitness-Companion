import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../util/urls'
import RHFDatePicker from '../components/RHFDatePicker'
import { useUserRegisterMutation } from '../redux/userApi'


enum GenderOptions {
    'male',
    'female'
}


const registerSchema = z.object({
    name: z.string().min(4, 'Name must be at least 4 characters long!'),
    email: z.string().email(),
    password: z.string().min(6),
    repass: z.string(),
    gender: z.string().min(1, "You must select a gender!"),
    birthDate: z.number({ invalid_type_error: 'You must choose a date of birth!' }),
    height: z.number({ invalid_type_error: "You must enter a number" }).min(145, 'You must be at least 145 tall to join the gym!')
}).refine((data) => data.password === data.repass, {
    message: "Passwords must match!",
    path: ["repass"]
}
)


type RegisterFormSchemaType = z.infer<typeof registerSchema>


export default function Register() {

    const navigate = useNavigate()

    const [userRegister] = useUserRegisterMutation()

    const { register, handleSubmit, formState: { errors }, control } = useForm<RegisterFormSchemaType>({ resolver: zodResolver(registerSchema) })
    const onSubmit: SubmitHandler<RegisterFormSchemaType> = (data) => {
        userRegister(data)
        navigate(ROUTE_PATH.HOME)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-700 flex flex-col flex-wrap content-center justify-center p-2">
            <div className='p-1 flex flex-col'>
                <label>Name</label>
                <input {...register('name')}></input>
                {errors.name && <p className='text-red-500 p-1'>{errors.name.message}</p>}

            </div>
            <div className='p-1 flex flex-col'>
                <label>Email</label>
                <input {...register('email')}></input>
                {errors.email && <p className='text-red-500 p-1'>{errors.email.message}</p>}

            </div>
            <div className='p-1 flex flex-col'>
                <label>Password</label>
                <input type='password' {...register('password')}></input>
                {errors.password && <p className='text-red-500 p-1'>{errors.password.message}</p>}

            </div>
            <div className='p-1 flex flex-col'>
                <label>Repeat Password</label>
                <input type='password' {...register('repass')}></input>
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
                <RHFDatePicker control={control} name='birthDate' />
                {errors.birthDate && <p className='text-red-500 p-1'>{errors.birthDate.message}</p>}

            </div>
            <div className='p-1 flex flex-col'>
                <label>Height in cm</label>
                <input type='number' {...register('height', { valueAsNumber: true })}></input>
                {errors.height && <p className='text-red-500 p-1'>{errors.height.message}</p>}

            </div>
            <div>
                <input type='submit' className='p-1 border rounded border-slate-300'></input>
            </div>
        </form>
    )
}




