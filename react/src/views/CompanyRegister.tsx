// Imports til createRef, useState og FormEvent
import { createRef, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

// Interface til registreringspayload
interface RegisterPayload {
    company_name: string;
    email: string;
    address: string;
    phone: number;
}

// Komponent til virksomhedsregistrering
export default function CompanyRegister() {
    // Oprettelse af refs til inputfelter
    const companyNameRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const addressRef = createRef<HTMLInputElement>();
    const phoneRef = createRef<HTMLInputElement>();

    // Tilstande til fejlbeskeder og notifikationer
    const [errors, setErrors] = useState<any>(null);
    const [notification, setNotification] = useState<string | null>(null);

    // Funktion til håndtering af formularindsendelse
    const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        setErrors(null);  // Nulstiller fejlbeskeder
        setNotification(null);  // Nulstiller notifikationer

        // Opretter payload ud fra inputfelterne
        const payload: RegisterPayload = {
            company_name: companyNameRef.current?.value || "",
            email: emailRef.current?.value || "",
            address: addressRef.current?.value || "",
            phone: Number(phoneRef.current?.value) || 0
        };

        // Sender post-anmodning til API for virksomhedsregistrering
        axiosClient.post('/companyRegister', payload)
            .then(({ data }) => {
                setNotification("Company registered successfully, with company number: " + data.id);  // Viser notifikation ved succesfuld registrering
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);  // Viser fejlbeskeder ved valideringsfejl
                }
            });
    };

    // Returnerer formular til virksomhedsregistrering
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Register company
            </h1>
            {errors && <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                    ))}
            </div>}
            {notification && <div className="notification">
                <p>{notification}</p>
            </div>}
            <input ref={companyNameRef} type="text" placeholder="Company name"/>
            <input ref={emailRef} type="email" placeholder="Email"/>
            <input ref={addressRef} type="text" placeholder="Address"/>
            <input ref={phoneRef} type="number" placeholder="Phone"/>
            <button className="btn btn-block">Register</button>
            <p className="message">
                <Link to="/login">Back to sign in</Link>
            </p>
        </form>
    );
}
