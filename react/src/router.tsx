import { Navigate, createBrowserRouter } from "react-router-dom";

import DefaultLayout from "./components/DefaultLayout.tsx";
import Calendar from "./views/Calendar.tsx";
import Profile from "./views/Profile.tsx";
import Company from "./views/Company.tsx";
import Users from "./views/Users.tsx";

import GuestLayout from "./components/GuestLayout.tsx";
import Login from "./views/Login.tsx";
import Signup from "./views/Signup.tsx";
import CompanyRegister from "./views/CompanyRegister.tsx";

import NotFound from "./views/NotFound.tsx";

// Opretter routeren med createBrowserRouter fra react-router-dom
const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/calendar" /> // Redirect til /calendar stien
            },
            {
                path: '/profile',
                element: <Profile /> // Viser Profile komponenten ved /profile stien
            },
            {
                path: '/calendar',
                element: <Calendar /> // Viser Calendar komponenten ved /calendar stien
            },
            {
                path: '/company',
                element: <Company /> // Viser Company komponenten ved /company stien
            },
            {
                path: '/users',
                element: <Users /> // Viser Users komponenten ved /users stien
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login /> // Viser Login komponenten ved /login stien
            },
            {
                path: '/signup',
                element: <Signup /> // Viser Signup komponenten ved /signup stien
            },
            {
                path: '/companyregister',
                element: <CompanyRegister /> // Viser CompanyRegister komponenten ved /companyregister stien
            }
        ]
    },
    {
        path: '*',
        element: <NotFound /> // Viser NotFound komponenten ved alle andre stier
    }
]);

export default router;
