import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../util/urls'
import { useUserLoginMutation } from '../redux/userApi'
import { isLoggedIn } from '../redux/isUserLoggedIn'
import { useEffect } from 'react'



const loginSchema = z.object({
    email: z.string({ invalid_type_error: "You must provide a valid email!" }).email(),
    password: z.string().min(1, 'You must provide a password!')
})

type LoginFormSchemaType = z.infer<typeof loginSchema>



export default function Login() {

    const userLoggedIn = useAppSelector((state) => state.isLoggedIn)

    const navigate = useNavigate()

    useEffect(() => {
        if (userLoggedIn) {

            navigate(ROUTE_PATH.HOME)
        }
    }, [userLoggedIn])

    const [userLogin] = useUserLoginMutation()

    const dispatch = useAppDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchemaType>({ resolver: zodResolver(loginSchema) })

    const onSubmit: SubmitHandler<LoginFormSchemaType> = (data) => {
        userLogin(data)
        dispatch(isLoggedIn())
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


