import { createRef, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider.tsx";

// Interface til oprettelsespayloaden
interface SignupPayload {
    surname: string;
    last_name: string;
    email: string;
    company_number: number;
    password: string;
    password_confirmation: string;
}

// Komponent til registrering af bruger
export default function Signup() {
    // Oprettelse af refs til inputfelter
    const surnameRef = createRef<HTMLInputElement>();
    const lastNameRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const companyNumberRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
    const passwordConfirmationRef = createRef<HTMLInputElement>();

    // Tilstand til fejlbeskeder
    const [errors, setErrors] = useState<any>(null);
    const { setUser, setToken } = useStateContext(); // Henter setUser og setToken fra context

    // Funktion til håndtering af formularindsendelse
    const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        const payload: SignupPayload = {
            surname: surnameRef.current?.value || "",
            last_name: lastNameRef.current?.value || "",
            email: emailRef.current?.value || "",
            company_number: Number(companyNumberRef.current?.value) || 0,
            password: passwordRef.current?.value || "",
            password_confirmation: passwordConfirmationRef.current?.value || "",
        };

        // Sender post-anmodning til API for at registrere bruger
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user); // Opdaterer brugeroplysninger i context
                setToken(data.token); // Opdaterer token i context
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors); // Viser fejlbeskeder ved valideringsfejl
                }
            });
    };

    // Returnerer formular til brugeroprettelse
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Create your account  {/* Overskrift til oprettelse af brugerkonto */}
            </h1>
            {errors && <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>}
            <input ref={surnameRef} type="text" placeholder="Surname" />
            <input ref={lastNameRef} type="text" placeholder="Last name" />
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={companyNumberRef} type="number" placeholder="Company number" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <input ref={passwordConfirmationRef} type="password" placeholder="Password confirmation" />
            <button className="btn btn-block">Signup</button>  {/* Knappen til at oprette bruger */}
            <p className="message">
                Already Registered? <Link to="/login">Sign in</Link>  {/* Link til login-side, hvis bruger allerede er registreret */}
            </p>
        </form>
    );
}
