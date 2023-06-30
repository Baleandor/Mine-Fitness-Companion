import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userOne } from '../mockBackend/users'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { login } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'
import { loadUserName } from '../util/loadUser'




const LoginSchema = z.object({
    name: z.string({ invalid_type_error: "You must provide a valid name!" }),
    email: z.string({ invalid_type_error: "You must provide a valid email!" }).email(),
    password: z.string().min(1, 'You must provide a password!')
})

type LoginFormSchemaType = z.infer<typeof LoginSchema>


export default function Login() {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchemaType>({ resolver: zodResolver(LoginSchema) })

    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.value.name)


    const onSubmit: SubmitHandler<LoginFormSchemaType> = (data) => {
        if (userOne.get('email') === data.email) {
            dispatch(login({ name: data.name, email: data.email }))
            loadUserName(user)
            navigate('/user-profile')
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-700 flex flex-col flex-wrap content-center justify-center p-2 text-slate-200">
            <div className='p-1 flex flex-col'>
                <label>Name</label>
                <input {...register('name')}></input>
                {errors.name && <p className='text-red-500 p-1'>{errors.name.message}</p>}
                <label>Login email</label>
                <input {...register('email')}></input>
                {errors.email && <p className='text-red-500 p-1'>{errors.email.message}</p>}
            </div>
            <div className='p-1 flex flex-col'>
                <label>Password</label>
                <input type='password'{...register('password')}></input>
                {errors.password && <p className='text-red-500 p-1'>{errors.password.message}</p>}

            </div>
            <div>
                <input type='submit' className='p-1 border rounded border-slate-300'></input>
            </div>
        </form>
    )
}