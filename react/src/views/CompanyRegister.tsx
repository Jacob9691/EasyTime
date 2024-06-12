import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

interface RegisterPayload {
    company_name: string;
    email: string;
    address: string;
    phone: number;
}

export default function CompanyRegister() {
    const companyNameRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const addressRef = createRef<HTMLInputElement>();
    const phoneRef = createRef<HTMLInputElement>();

    const [errors, setErrors] = useState(null);

    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        
        const payload: RegisterPayload = {
            company_name: companyNameRef.current?.value || "",
            email: emailRef.current?.value || "",
            address: addressRef.current?.value || "",
            phone: Number(phoneRef.current?.value) || 0
        };

        axiosClient.post('/companyRegister', payload)
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Register company
            </h1>
            {errors && <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }
            <input type="text" placeholder="Company name"/>
            <input type="email" placeholder="Email"/>
            <input type="text" placeholder="Address"/>
            <input type="number" placeholder="Phone"/>
            <button className="btn btn-block">Register</button>
            <p className="message">
                <Link to="/login">Back to sign in</Link>
            </p>
        </form>
    )
}       