import React, { useContext } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";

const AddOffer = (props) => {
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  async function addOffreSubmitHandler(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const newOffre = {
      titre: data.titre,
      nomEmployeur: data.nomEmployeur,
      email: data.email,
      salaire: data.salaire,
      details: data.details,
      employeurId: auth.user,
      published: data.published === "on",
    };

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "offres/",
        "POST",
        JSON.stringify(newOffre),
        { "Content-Type": "application/json" }
      );
    } catch (err) {
      console.error(err);
    }
    console.log(JSON.stringify(newOffre));
    event.target.reset();
    navigate("/offres?refresh=true");
  }

  return (
    <form onSubmit={addOffreSubmitHandler}>
      <div>
        <label>Titre*:</label>
        <input type="titre" name="titre" required />
      </div>
      <div>
        <label>Email*: </label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label>Nom employeur: </label>
        <input type="nomEmployeur" name="nomEmployeur" />
      </div>
      <div>
        <label>Salaire: </label>
        <input type="salaire" name="salaire" />
      </div>
      <div>
        <label>Détails de l'emploi: </label>
        <textarea name="details" cols="60" rows="5"></textarea>
      </div>

      <div>
        <label>Publier cette offre :</label>
        <input type="checkbox" name="published" />
      </div>

      <button type="submit">Créer</button>
      <button onClick={() => navigate("/offers-Entrp")}>Retour</button>
    </form>
  );
};

export default AddOffer;
