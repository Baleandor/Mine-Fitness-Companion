import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logout } from "../features/userSlice";


export default function Navbar() {

    const dispatch = useAppDispatch()

    const user = useAppSelector((state) => state.user.value.name)

    const userLogout = () => {
        localStorage.clear()
        dispatch(logout())
    }


    return (
        <nav className="flex">
            {user.length > 1 ?
                <div>
                    <Link to={'/user-profile'} className="p-2">Profile</Link>
                    <Link to={'/'} className="p-2" onClick={userLogout}>Logout</Link>

                </div> :
                <div>
                    <Link to={'/login'} className="p-2">Login</Link>
                    <Link to={'/register'} className="p-2">Register</Link>
                </div>
            }
            <div>
                <Link to={'/exercise-library'} className="p-2">Exercise Library</Link>
            </div>

        </nav>
    )
}