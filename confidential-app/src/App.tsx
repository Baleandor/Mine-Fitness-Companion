import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ROUTE_PATH } from './util/urls';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Root from './pages/Root';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import UpdateMeasurements from './pages/UpdateMeasurements';
import UpdateUserBasicInfo from './pages/UpdateUserBasicInfo';
import MeasurementsOverTime from './pages/MeasurementsOverTime';
import ExerciseLibrary from './pages/ExerciseLibrary';
import ExerciseLibraryEditExercise from './pages/ExerciseLibraryEditExercise';
import EditWorkout from './pages/Workouts';
import Workouts from './pages/Workouts';
import WeightChartsOverTime from './pages/WeightChartsOverTime';
import Home from './pages/Home';
import CheckAllMeasurements from './pages/CheckAllMeasurements';


export default function App() {

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path={ROUTE_PATH.HOME} element={<Root />} errorElement={<NotFound />}>
            <Route index element={<Home />} />
            <Route path={ROUTE_PATH.LOGIN} element={<Login />} />
            <Route path={ROUTE_PATH.REGISTER} element={<Register />} />
            <Route path={ROUTE_PATH.USER_PROFILE} element={<UserProfile />} />
            <Route path={ROUTE_PATH.USER_PROFILE_MEASUREMENTS} element={<UpdateMeasurements />} />
            <Route path={ROUTE_PATH.USER_PROFILE_BASIC_INFO} element={<UpdateUserBasicInfo />} />
            <Route path={ROUTE_PATH.USER_PROFILE_MEASUREMENTS_OVER_TIME} element={<MeasurementsOverTime />} />
            <Route path={ROUTE_PATH.USER_PROFILE_WEIGHT_OVER_TIME} element={<WeightChartsOverTime />} />
            <Route path={ROUTE_PATH.EXERCISE_LIBRARY} element={<ExerciseLibrary />} />
            <Route path={ROUTE_PATH.EXERCISE_LIBRARY_EDIT_EXERCISE} element={<ExerciseLibraryEditExercise />} />
            <Route path={ROUTE_PATH.WORKOUTS} element={<Workouts />} />
            <Route path={ROUTE_PATH.EDIT_WORKOUT} element={<EditWorkout />} />
            <Route path={ROUTE_PATH.CHECK_ALL_MEASUREMENTS} element={<CheckAllMeasurements />} />
        </Route>
    ))


    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )
}


