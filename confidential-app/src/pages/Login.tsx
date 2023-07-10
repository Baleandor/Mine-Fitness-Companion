import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '../hooks/hooks'
import { login } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../util/urls'
import { usersByIdMap } from '../mockBackend/users'



const loginSchema = z.object({
    email: z.string({ invalid_type_error: "You must provide a valid email!" }).email(),
    password: z.string().min(1, 'You must provide a password!')
})

type LoginFormSchemaType = z.infer<typeof loginSchema>


export default function Login() {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchemaType>({ resolver: zodResolver(loginSchema) })

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<LoginFormSchemaType> = (data) => {

        let userExists = false
        usersByIdMap.forEach((user) => {
            if (user.email === data.email && user.password === data.password) {
                userExists = true
            }
        })

        if (userExists) {
            dispatch(login(data))
            navigate(ROUTE_PATH.HOME)
        }else {
            alert(`Invalid data or user doesn't exist!`)
        }


    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-700 flex flex-col flex-wrap content-center justify-center p-2 text-slate-200">
            <div className='p-1 flex flex-col'>
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