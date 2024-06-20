import { useEffect, useState } from 'react';
import axiosClient from '../axios-client.ts';
import { useStateContext } from "../contexts/ContextProvider.tsx";

// Interface til brugerobjektet
interface User {
    id: number;
    surname: string;
    last_name: string;
    email: string;
    address: string;
    phone: number;
    admin: boolean;
}

// Komponent til visning af alle brugere
export default function Users() {
    const [users, setUsers] = useState<User[]>([]); // Tilstand til at gemme brugerliste
    const [loading, setLoading] = useState(true); // Tilstand til indikation af indlæsning
    const { user } = useStateContext(); // Henter brugeroplysninger fra context

    // Effekt der kaldes ved komponentens oprettelse
    useEffect(() => {
        axiosClient.get(`/users/${user.company_number}`) // Anmodning om at hente brugere for det aktuelle firma
            .then(({ data }) => {
                setUsers(data); // Opdaterer brugerlisten med data fra anmodningen
                setLoading(false); // Indlæsning er færdig
            })
            .catch(() => {
                setLoading(false); // Hvis der opstår en fejl, afsluttes indlæsning
            });
    }, []);

    // Hvis der stadig indlæses, vises dette
    if (loading) {
        return <div>Loading...</div>;
    }

    // Returnerer komponenten til visning af brugerlisten
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>All Users</h1> {/* Overskrift for alle brugere */}
            </div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Surname</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Admin</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.surname}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.phone}</td>
                            <td>{user.admin ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
