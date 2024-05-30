import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

interface SignupPayload {
    surname: string;
    last_name: string;
    email: string;
    company_number: number;
    password: string;
    password_confirmation: string;
}

export default function Signup() {
    const surnameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const companyNumberRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev: any) => {
        ev.preventDefault()
        
        const payload: SignupPayload = {
            surname: surnameRef.current?.value || "",
            last_name: lastNameRef.current?.value || "",
            email: emailRef.current?.value || "",
            company_number: Number(companyNumberRef.current?.value) || 0,
            password: passwordRef.current?.value || "",
            password_confirmation: passwordConfirmationRef.current?.value || "",
        };

        axiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Create your account
            </h1>
            <input ref={surnameRef} type="text" placeholder="Surname"/>
            <input ref={lastNameRef} type="text" placeholder="Last name"/>
            <input ref={emailRef} type="email" placeholder="Email"/>
            <input ref={companyNumberRef} type="number" placeholder="Company number"/>
            <input ref={passwordRef} type="password" placeholder="Password"/>
            <input ref={passwordConfirmationRef} type="password" placeholder="Password confirmation"/>
            <button className="btn btn-block">Signup</button>
            <p className="message">
                Already Registered? <Link to="/login">Sign in</Link>
            </p>
        </form>
    )
}       