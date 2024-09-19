import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Inscription({ type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
  };

  return (
    <form onSubmit={handleRegister}>
      <div>
        <label>Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Inscription</button>
    </form>
  );
}
