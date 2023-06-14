import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Root() {


    return (
        <div className="flex flex-col justify-center items-center">
            <Navbar />
            <div className="bg-green-500 p-1 w-3/5">
                <Outlet />
            </div>
        </div>
    )
}