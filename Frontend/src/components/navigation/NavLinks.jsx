import { useContext } from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="navi-links">
      {auth.user === null ? (
        <>
          <li>
            <NavLink to="/connexion">Connexion</NavLink>
          </li>
          <li>
            <NavLink to="/register">Inscription</NavLink>
          </li>
        </>
      ) : (
        <li>
          <NavLink to="/connexion" onClick={() => auth.logout()}>
            Deconnexion
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
