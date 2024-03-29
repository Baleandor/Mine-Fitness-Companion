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
import UpdateMeasurements from './pages/AddMeasurements';
import UpdateUserBasicInfo from './pages/UpdateUserBasicInfo';
import MeasurementsOverTime from './pages/MeasurementsOverTime';
import ExerciseLibrary from './pages/ExerciseLibrary';
import ExerciseLibraryEditExercise from './pages/ExerciseLibraryEditExercise';
import Workouts from './pages/Workouts';
import Home from './pages/Home';
import CreateExerciseType from './pages/CreateExerciseType';
import WorkoutEdit from './pages/WorkoutEdit';
import CreateWorkout from './pages/CreateWorkout';

export default function App() {


    const router = createBrowserRouter(createRoutesFromElements(
        <Route path={ROUTE_PATH.HOME} element={<Root />} errorElement={<NotFound />}>
            <Route index element={<Home />} />
            <Route path={ROUTE_PATH.LOGIN} element={<Login />} />
            <Route path={ROUTE_PATH.REGISTER} element={<Register />} />

            <Route path={ROUTE_PATH.USER_PROFILE}>
                <Route index element={<UserProfile />} />
                <Route path={ROUTE_PATH.USER_PROFILE_BASIC_INFO} element={<UpdateUserBasicInfo />} />
                <Route path={ROUTE_PATH.USER_PROFILE_MEASUREMENTS} element={<UpdateMeasurements />} />
                <Route path={ROUTE_PATH.USER_PROFILE_MEASUREMENTS_OVER_TIME} element={<MeasurementsOverTime />} />
            </Route>

            <Route path={ROUTE_PATH.EXERCISE_LIBRARY}>
                <Route index element={<ExerciseLibrary />} />
                <Route path={ROUTE_PATH.EXERCISE_LIBRARY_EDIT_EXERCISE} element={<ExerciseLibraryEditExercise />} />
                <Route path={ROUTE_PATH.EXERCISE_LIBRARY_CREATE_EXERCISE_TYPE} element={<CreateExerciseType />} />
            </Route>

            <Route path={ROUTE_PATH.WORKOUTS}>
                <Route index element={<Workouts />} />
                <Route path={ROUTE_PATH.WORKOUTS_EDIT} element={<WorkoutEdit />} />
                <Route path={ROUTE_PATH.WORKOUTS_CREATE} element={<CreateWorkout />} />
            </Route>
        </Route>
    ))


    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )
}


