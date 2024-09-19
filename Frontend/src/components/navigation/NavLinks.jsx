import { useContext } from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  console.log(auth);

  return (
    <ul className="liens-nav">
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/connexion">Connexion</NavLink>
          <br />
          <NavLink to="/register">Inscription</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
