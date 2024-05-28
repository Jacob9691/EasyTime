import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const {user, token} = useStateContext()

    if (!token) {
        return <Navigate to="/login"/> 
    }

    const onLogout = (ev: any) => {
        ev.preventDefault() 
    }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/users">Users</Link>
            </aside>
            <div>
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user?.name}
                        <a 
                            href="#" 
                            onClick={onLogout} 
                            className="btn-logout"
                            >Logout
                        </a>
                    </div>
                </header>
            </div>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}   