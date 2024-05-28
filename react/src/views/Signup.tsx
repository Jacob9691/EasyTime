import { Link } from "react-router-dom";

export default function Signup() {

    const onSubmit = (ev: any) => {
        ev.preventDefault() 
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Create your account
                    </h1>
                    <input type="text" placeholder="Surname"/>
                    <input type="text" placeholder="Lastname"/>
                    <input type="email" placeholder="Email"/>
                    <input type="number" placeholder="Company number"/>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Password confirmation"/>
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}       