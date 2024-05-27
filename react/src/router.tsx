import { createBrowserRouter } from "react-router-dom";

import DefaultLayout from "./components/DefaultLayout.tsx";
import Users from "./views/Users.tsx";

import GuestLayout from "./components/GuestLayout.tsx";
import Login from "./views/Login.tsx";
import Signup from "./views/Signup.tsx";

import NotFound from "./views/NotFound.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/users',
                element: <Users />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router; 