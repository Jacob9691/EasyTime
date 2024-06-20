// Imports til Link, logo, createRef, useState og React.FormEvent
import { Link } from "react-router-dom";
import logo from "../assets/EasyTimeLogo.jpg";
import React, { createRef, useState } from "react";
import axiosClient from "../axios-client.ts";
import { useStateContext } from "../contexts/ContextProvider.tsx";

// Interface til login-payload
interface LoginPayload {
    email: string;
    password: string;
}

// Komponent til login
export default function Login() {
    // Oprettelse af refs til inputfelter
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();

    // Tilstand til at gemme besked ved fejl i login
    const [message, setMessage] = useState<string | null>(null);

    // Henter setUser og setToken fra context
    const { setUser, setToken } = useStateContext();

    // Funktion til håndtering af formularindsendelse
    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        const payload: LoginPayload = {
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || ""
        };

        // Sender post-anmodning til API for login
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user);  // Opdaterer brugeroplysninger i context
                setToken(data.token);  // Opdaterer token i context
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message);  // Viser fejlbesked ved valideringsfejl
                }
            });
    };

    // Returnerer formular til login
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Welcome to EasyTime
            </h1>
            <img src={logo} alt="EasyTimeLogo" width="290px"/>
            <h1 className="title">
                Login into your account
            </h1>
            {message &&
                <div className="alert">
                    <p>{message}</p>  {/* Viser fejlbesked ved loginfejl */}
                </div>
            }
            <input ref={emailRef} type="email" placeholder="Email"/>
            <input ref={passwordRef} type="password" placeholder="Password"/>
            <button className="btn btn-block">Login</button>  {/* Login-knap */}
            <p className="message">
                Not Registered? <Link to="/signup">Create an account</Link>  {/* Link til registreringsside */}
            </p>
            <p className="message">
                <Link to="/companyregister">Register Company</Link>  {/* Link til virksomhedsregistreringsside */}
            </p>
        </form>
    );
}
