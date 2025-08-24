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

  async function authSubmitHandler(e) {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries()); // { email, mdp, type }
    console.log("data", data);

    // Pick the API base from env (prod or dev) and make sure there's exactly one slash
    const API_BASE = (
      import.meta?.env?.VITE_API_URL ||
      process.env.REACT_APP_BACKEND_URL ||
      ""
    ).replace(/\/+$/, "");

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // helpful error if backend returns 4xx/5xx
        const text = await res.text();
        throw new Error(`HTTP ${res.status} – ${text}`);
      }

      const json = await res.json();
      console.log("register response:", json);

      auth.login(json.user.id, json.token);
      if (json.user?.id) navigate("/offres");

      e.target.reset();
      SetError(null);
    } catch (err) {
      console.error(err);
      SetError(err.message || "Une erreur est survenue");
    }
  }

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
