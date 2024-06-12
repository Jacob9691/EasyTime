import { Link } from "react-router-dom";
import logo from "../assets/EasyTimeLogo.jpg";
import React, {createRef, useState} from "react";
import axiosClient from "../axios-client.ts";
import {useStateContext} from "../contexts/ContextProvider.tsx";

interface LoginPayload {
    email: string;
    password: string;
}

interface ErrorState {
    email?: string[];
    password?: string[];
}

export default function Login() {
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();

    const [errors, setErrors] = useState<ErrorState | null>(null);
    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        const payload: LoginPayload = {
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || ""
        };

        setErrors(null);

        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                }
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Welcome to EasyTime
            </h1>
            <img src={logo} alt="EasyTimeLogo" width="290px"/>
            <h1 className="title">
                Login into your account
            </h1>
            {errors && <div className="alert">
                {Object.keys(errors).map(key => {
                    const errorKey = key as keyof ErrorState;
                    return <p key={key}>{errors[errorKey]?.[0]}</p>;
                })}
            </div>
            }
            <input ref={emailRef} type="email" placeholder="Email"/>
            <input ref={passwordRef} type="password" placeholder="Password"/>
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Registered? <Link to="/signup">Create an account</Link>
            </p>
            <p className="message">
                <Link to="/companyregister">Register Company</Link>
            </p>
        </form>
    )
}
