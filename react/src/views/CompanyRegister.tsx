import { Link } from "react-router-dom";

export default function CompanyRegister() {

    const onSubmit = (ev: any) => {
        ev.preventDefault() 
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Register company
            </h1>
            <input type="text" placeholder="Company name"/>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <input type="password" placeholder="Password confirmation"/>
            <button className="btn btn-block">Register</button>
            <p className="message">
                <Link to="/login">Back to sign in</Link>
            </p>
        </form>
    )
}       