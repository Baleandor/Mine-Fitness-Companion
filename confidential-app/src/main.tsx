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
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

)
