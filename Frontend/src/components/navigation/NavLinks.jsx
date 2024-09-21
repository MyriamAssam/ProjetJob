import { useContext } from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="liens-nav">
      {auth.user === null ? (
        <li>
          <NavLink to="/connexion">Connexion</NavLink>
          <br />
          <NavLink to="/register">Inscription</NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/connexion" onClick={() => auth.logout()}>Deconnexion</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
