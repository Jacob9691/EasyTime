import { ChangeEvent, useState, FormEvent } from 'react';
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

// Komponent til brugerprofil
export default function Profile() {
    const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(null);  // Tilstand til fejlbeskeder
    const [notification, setNotification] = useState<string | null>(null);  // Tilstand til notifikationer
    const { user, setUser } = useStateContext();  // Henter brugeroplysninger og setUser fra context

    // Funktion til håndtering af ændringer i inputfelter
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    // Funktion til håndtering af formularindsendelse
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrors(null);  // Nulstiller fejlbeskeder
        setNotification(null);  // Nulstiller notifikationer

        // Opretter payload med brugeroplysninger
        const payload = {
            id: user.id,
            surname: user.surname,
            last_name: user.last_name,
            email: user.email,
            address: user.address,
            phone: user.phone,
        };

        // Sender post-anmodning til API for at opdatere brugeroplysninger
        axiosClient.post('/updateUser', payload)
            .then(({ data }) => {
                setNotification(data.user.surname + data.message);  // Viser notifikation ved succesfuld opdatering
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);  // Viser fejlbeskeder ved valideringsfejl
                }
            });
    };

    // Returnerer formular til brugerprofil
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Profile</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <form onSubmit={handleSubmit}>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    {notification && <div className="notification">
                        <p>{notification}</p>
                    </div>}
                    <div>
                        <label htmlFor="surname">Surname:</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={user.surname || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last name:</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={user.last_name || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={user.address || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={user.phone || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-block">Update User</button>
                </form>
            </div>
        </div>
    );
}
