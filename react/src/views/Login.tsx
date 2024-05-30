import { Link } from "react-router-dom";
import logo from "../assets/EasyTimeLogo.jpg";

export default function Login() {

    const onSubmit = (ev: any) => {
        ev.preventDefault() 
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
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
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