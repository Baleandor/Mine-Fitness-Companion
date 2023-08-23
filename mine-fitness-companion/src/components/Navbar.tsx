import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ROUTE_PATH } from "../util/urls";
import { useEffect } from "react";
import { isLoggedOut } from "../redux/userSlice";
import { useUserLogoutMutation } from "../redux/userApi";





export default function Navbar() {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const isUserLoggedIn = useAppSelector((state) => state.isLoggedIn)

    const [userLogout] = useUserLogoutMutation()

    useEffect(() => {
        if (isUserLoggedIn === false) {
            navigate(ROUTE_PATH.HOME)
        }
    }, [isUserLoggedIn])

    const onLogout = () => {
        dispatch(isLoggedOut())
        userLogout(isUserLoggedIn)
    }


    return (
        <nav className="flex">
            <Link to={ROUTE_PATH.HOME} className="p-2">Home</Link>

            {isUserLoggedIn ?
                <>
                    <Link to={ROUTE_PATH.USER_PROFILE} className="p-2">Profile</Link>
                    <button className="p-2" onClick={onLogout}>Logout</button>

                </> :
                <>
                    <Link to={ROUTE_PATH.LOGIN} className="p-2">Login</Link>
                    <Link to={ROUTE_PATH.REGISTER} className="p-2">Register</Link>
                </>
            }

            <Link to={ROUTE_PATH.EXERCISE_LIBRARY} className="p-2">Exercise Library</Link>

        </nav>
    )
}