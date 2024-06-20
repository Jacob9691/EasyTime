// Imports til ChangeEvent, useState, FormEvent og useEffect
import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider.tsx";  // Bruger context fra ContextProvider

// Interface til virksomhedsdata
interface Company {
    id?: number;
    company_name?: string;
    email?: string;
    address?: string;
    phone?: number;
}

// Komponent til virksomhedsadministration
export default function Company() {
    const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(null);  // Tilstand til fejlbeskeder
    const [notification, setNotification] = useState<string | null>(null);  // Tilstand til notifikationer
    const [company, setCompany] = useState<Company | null>(null);  // Tilstand til virksomhedsdata
    const { user } = useStateContext();  // Bruger tilstand fra context

    // Funktion til håndtering af input-ændringer
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCompany({
            ...company,
            [name]: value
        });
    };

    // Funktion til håndtering af formularindsendelse
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrors(null);  // Nulstiller fejlbeskeder
        setNotification(null);  // Nulstiller notifikationer

        const payload = {
            id: company?.id,
            company_name: company?.company_name,
            email: company?.email,
            address: company?.address,
            phone: company?.phone,
        };

        axiosClient.post('/updateCompany', payload)
            .then(({ data }) => {
                setNotification(data.message);  // Viser notifikation ved succesfuld opdatering
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);  // Viser fejlbeskeder ved valideringsfejl
                }
            });
    };

    // Effekt til at hente virksomhedsdata ved komponentens indlæsning
    useEffect(() => {
        axiosClient.get(`/company/${user.company_number}`)
            .then(({ data }) => {
                setCompany(data);  // Opdaterer tilstanden med hentede virksomhedsdata
            })
            .catch(error => {
                console.error('Error fetching company data:', error);
            });
    }, []);

    // Returnerer komponenten til virksomhedsadministration med formular til opdatering af virksomhedsoplysninger
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Company</h1>  {/* Overskrift til virksomhedsadministration */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <form onSubmit={handleSubmit}>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>  /* Viser første fejl for hver valideringsfejl */
                                ))}
                        </div>
                    )}
                    {notification && <div className="notification">
                        <p>{notification}</p>  /
                    </div>}
                    <div>
                        <label htmlFor="company_name">Company name:</label>
                        <input
                            type="text"
                            id="company_name"
                            name="company_name"
                            value={company?.company_name || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={company?.email || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={company?.address || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={company?.phone || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-block">Update Company</button>
                </form>
            </div>
        </div>
    );
}
