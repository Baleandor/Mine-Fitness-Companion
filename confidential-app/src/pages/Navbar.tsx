import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logout } from "../features/userSlice";
import { ROUTE_PATH } from "../util/urls";


export default function Navbar() {

    const dispatch = useAppDispatch()

    const user = useAppSelector((state) => state.user.value.name)

    const userLogout = () => {
        localStorage.clear()
        dispatch(logout())
    }


    return (
        <nav className="flex">
            <Link to={ROUTE_PATH.HOME} className="p-2" />
            {user.length > 1 ?
                <div>
                    <Link to={ROUTE_PATH.USER_PROFILE} className="p-2">Profile</Link>
                    <Link to={ROUTE_PATH.HOME} className="p-2" onClick={userLogout}>Logout</Link>

                </div> :
                <div>
                    <Link to={ROUTE_PATH.LOGIN} className="p-2">Login</Link>
                    <Link to={ROUTE_PATH.REGISTER} className="p-2">Register</Link>
                </div>
            }
            <div>
                <Link to={ROUTE_PATH.EXERCISE_LIBRARY} className="p-2">Exercise Library</Link>
            </div>

        </nav>
    )
}