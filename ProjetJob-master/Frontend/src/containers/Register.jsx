import "./Register.css";
import Inscription from "../components/inscription/Inscription";
import { useState } from "react";

export default function Register() {
  const [typeCompte, setTypeCompte] = useState("Candidat");

  return (
    <div>
      <div className="typeCompte">
        <h2>Je suis un...</h2>
        <a onClick={() => setTypeCompte("Candidat")}>Candidat</a>
        <a onClick={() => setTypeCompte("Employeur")}>Employeur</a>
      </div>

      <Inscription type={typeCompte} />
    </div>
  );
}
