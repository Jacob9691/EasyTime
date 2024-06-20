// Imports til React og routing
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";  // Bruger context fra ContextProvider

// Komponent til gæstelayout
export default function GuestLayout() {
    // Bruger tilstand fra context til at kontrollere token
    const { token } = useStateContext();

    // Hvis der er et gyldigt token, navigeres brugeren til startsiden
    if (token) {
        return <Navigate to="/" />;
    }

    // Returnerer layoutet til gæst, som indeholder formularindholdet fra routes
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <Outlet />  {/* Viser indholdet af den aktuelle rute */}
            </div>
        </div>
    );
}
