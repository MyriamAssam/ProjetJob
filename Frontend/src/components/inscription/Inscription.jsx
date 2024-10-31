import "./Inscription.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AuthContext } from "../context/AuthContext";

export default function Inscription(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const { user, token } = useAuthContext();
  const auth = useContext(AuthContext);
  const [error, SetError] = useState(null);

  async function authSubmitHandler(event) {
    event.preventDefault();
    const inputs = new FormData(event.target);
    const data = Object.fromEntries(inputs.entries());
    console.log("data ", data);
    event.target.reset();
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "users/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      console.log("2", responseData);
      auth.login(responseData.user.id, responseData.token);
      // ca va afficher toutes les offres meme si t'es employeur
      if (responseData.user.id !== undefined) {
        navigate("/offres");
      }
      console.log("data1 ", responseData);
    } catch (err) {
      SetError(err.message || "une erreur");
      console.log(err);
    }
  }

  /*
    const handleRegister = (e) => {
        e.preventDefault();


    // Logique d'inscription (à implémenter)
    const isRegistered = true; // Remplacer par la vraie logique d'inscription

        if (isRegistered) {
            if (type === "Candidat") {
                // Redirige vers la page des offres si l'utilisateur est un candidat
                navigate("/offres");
            } else if (type === "Employeur") {
                // Redirige vers la page d'ajout d'offre si l'utilisateur est un employeur
                navigate("/add-offer");
            }
        } else {
            console.log("Échec de l'inscription");
        }
    }; */

  return (
    <form onSubmit={authSubmitHandler}>
      <h2>Inscription à JoBang!</h2>
      <div className="controles-rows">
        <div className="controles no-margin">
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="controles-rows">
        <div className="controles no-margin">
          <label>Mot de passe :</label>
          <input
            type="password"
            name="mdp"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="controles-rows">
        <div className="controles no-margin">
          <label>Type :</label>
          <input
            type="type"
            name="type"
            value={props.type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="boutonLog" type="submit">
          Inscription
        </button>
      </p>
    </form>
  );
}
