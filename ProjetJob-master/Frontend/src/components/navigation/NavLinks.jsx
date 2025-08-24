import { useContext, useState, useEffect } from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../context/AuthContext";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const [type, setType] = useState("");
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    async function infoProfil() {
      try {
        const foundUserData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `users/find/${auth.user}/`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
          }
        );
        setType(foundUserData.users[0].type);
        console.log(foundUserData.users[0]);
      } catch (e) {
        console.error(e);
      }
    }
    if (auth.user !== null) {
      infoProfil();
    }
  }, [auth.user]);

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
        <ul className="navi-links">
          {type === "Employeur" ? (
            <li>
              <NavLink to="/connexion" onClick={() => auth.logout()}>
                Deconnexion
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/listeSoumission">Ma liste</NavLink>
              </li>
              <li>
                <NavLink to="/connexion" onClick={() => auth.logout()}>
                  Deconnexion
                </NavLink>
              </li>
            </>
          )}
        </ul>
      )}
    </ul>
  );
};

export default NavLinks;
