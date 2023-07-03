import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logout } from "../redux/authSlice";
import { ROUTE_PATH } from "../util/urls";
import { userPermittedActions } from "../api/userPermittedActions";



export default function Navbar() {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const user = useAppSelector((state) => state.auth.value.user)

    const onLogout = () => {
        dispatch(logout())
        navigate(ROUTE_PATH.HOME)
    }

    const buttonTest = () => {
        userPermittedActions.getUserBasicInfo()
    }

    return (
        <nav className="flex">
            <Link to={ROUTE_PATH.HOME} className="p-2">Home</Link>

            {user != null ?
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
            <button onClick={buttonTest}>Test</button>
        </nav>
    )
}