import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <nav className="flex">
            <Link to={'/login'} className="p-2">Login</Link>
            <Link to={'/'} className="p-2">Register</Link>
            <Link to={'/'} className="p-2">Profile</Link>
            <Link to={'/'} className="p-2">Logout</Link>
        </nav>
    )
}