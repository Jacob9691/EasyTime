// Imports til React og routing
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";  // Bruger context fra ContextProvider
import React, { useEffect, useState } from "react";  // React hooks bruges til state management
import axiosClient from "../axios-client.ts";  // Axios instance for API opkald
import logo from "../assets/EasyTimeLogo.jpg";  // Logo til visning i layout

// Interface til virksomhedsdata
interface Company {
    id: number;
    company_name: string;
    email: string;
    address: string;
    phone: number;
}

// Hovedkomponenten til standardlayout
export default function DefaultLayout() {
    // Bruger tilstand fra context
    const { user, token, setUser, setToken } = useStateContext();

    // Tilstande for bruger- og virksomhedsdata, samt indlæsningstilstande
    const [company, setCompany] = useState<Company | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingCompany, setLoadingCompany] = useState(true);

    // Hvis der ikke er et gyldigt token, navigeres til login-siden
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Funktion til håndtering af logud
    const onLogout = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        ev.preventDefault();

        // POST anmodning til logud på serveren
        axiosClient.post('/logout')
            .then(() => {
                // Nulstil bruger og token til standardværdier
                setUser({
                    id: '',
                    surname: '',
                    last_name: '',
                    company_number: 0,
                    email: '',
                    address: '',
                    phone: '',
                    admin: false
                });
                setToken(null);
            });
    };

    // Effekt til at hente brugerdata ved indlæsning
    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
                setLoadingUser(false);
            });
    }, []);

    // Effekt til at hente virksomhedsdata, når brugerdata er indlæst
    useEffect(() => {
        if (!loadingUser && user?.company_number) {
            axiosClient.get(`/company/${user.company_number}`)
                .then(({ data }) => {
                    setCompany(data);
                    setLoadingCompany(false);
                });
        }
    }, [loadingUser, user]);

    // Hvis der stadig indlæses bruger- eller virksomhedsdata, vises en indlæsningsbesked
    if (loadingUser || loadingCompany) {
        return <div>Loading...</div>;
    }

    // Returnerer det samlede layout med navigationslinks, brugerinfo og virksomhedsoplysninger
    return (
        <div id="defaultLayout">
            <aside>
                <img src={logo} alt="EasyTimeLogo" width="200px" />  {/* Viser virksomhedslogo */}
                <Link to="/calendar">Calendar</Link>  {/* Link til kalender */}
                <Link to="/profile">Profile</Link>  {/* Link til profil */}
                {/* Viser links til virksomhedsadministration, hvis brugeren er administrator */}
                {user?.admin && (
                    <>
                        <Link to="/company">Company</Link>
                        <Link to="/users">Users</Link>
                    </>
                )}
            </aside>
            <div className="content">
                <header>
                    <div>
                        EasyTime - {company?.company_name} ({company?.id})  {/* Viser virksomhedsnavn og ID */}
                    </div>

                    <div>
                        {user?.surname} &nbsp;&nbsp;  {/* Viser brugers efternavn */}
                        <a
                            href="#"
                            onClick={onLogout}
                            className="btn-logout"
                        >
                            Logout  {/* Knappen til logud */}
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />  {/* Viser indholdet af den aktuelle rute */}
                </main>
            </div>
        </div>
    );
}
