import { useContext } from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavLinks = (props) => {
    const auth = useContext(AuthContext);
    return (
        <ul className="liens-nav">
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/login">Connexion</NavLink>
                    <NavLink to="/inscription">Inscription</NavLink>
                </li>
            )}

        </ul>
    );
};

export default NavLinks;