import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Root from './pages/Root';
import Register from './pages/Register';
import { store } from './store';
import { Provider } from 'react-redux';
import UserProfile from './pages/UserProfile';
import UpdateMeasurements from './pages/UpdateMeasurements';
import UpdateUserBasicInfo from './pages/UpdateUserBasicInfo';
import MeasurementsOverTime from './pages/MeasurementsOverTime';
import ExerciseLibrary from './pages/ExerciseLibrary';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "user-profile/update-measurements",
        element: <UpdateMeasurements />,
      },
      {
        path: "user-profile/update-basic-info",
        element: <UpdateUserBasicInfo />,
      },
      {
        path: "user-profile/measurements-over-time",
        element: <MeasurementsOverTime />,
      },
      {
        path: "exercise-library",
        element: <ExerciseLibrary />,
      },
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

)
