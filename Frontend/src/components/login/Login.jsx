import "./Login.css";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
export default function Login() {
    const auth = useContext(AuthContext);
    function authSubmitHandler(event) {
        event.preventDefault();
        const inputs = new FormData(event.target);
        const enteredEmail = inputs.get("email");
        const data = Object.fromEntries(inputs.entries());
        console.log("Email: ", data.email);
        console.log("Password: ", data.password);
        event.target.reset();
        auth.login();
    }
    return (
        <form onSubmit={authSubmitHandler}>
            <h2>Login</h2>

            <div className="controles-row">
                <div className="controles no-margin">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required />
                </div>

                <div className="controles no-margin">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" required />
                </div>
            </div>
            <div></div>
            <p className="form-actions">
                <p>
                    <Link to="/inscription">Inscription</Link>
                    <NavLink />
                </p>

                <button className="boutonLog boutonLog-flat" type="reset">
                    Reset
                </button>
                <button className="boutonLog" type="submit">
                    Login
                </button>
            </p>
        </form>
    );
}
