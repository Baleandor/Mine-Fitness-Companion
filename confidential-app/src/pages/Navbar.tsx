import { useState } from "react";
import { Link } from "react-router-dom";


export default function Navbar() {

   


    const user = localStorage.getItem('user')

    const logout = () => {
        localStorage.clear()
    }

    return (
        <nav className="flex">
            {user ?
                <div>
                    <Link to={'/user-profile'} className="p-2">Profile</Link>
                    <Link to={'/'} className="p-2" onClick={logout}>Logout</Link>

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