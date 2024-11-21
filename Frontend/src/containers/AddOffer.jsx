import "./AddOffer.css";
import React, { useContext } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";

const AddOffer = (props) => {
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  let titre, nomEmployeur, email, salaire, details, published

  const location = useLocation();
  if (location.state !== null) {
    titre = location.state.titre + " (COPIE)";
    nomEmployeur = location.state.nomEmployeur;
    email = location.state.email;
    salaire = location.state.salaire;
    details = location.state.details;
    published = location.state.published;

    console.log("published : " + published);
  } else {
    titre = "";
    nomEmployeur = "";
    email = "";
    salaire = 0;
    details = "";
    published = null;
    console.log(titre);
  }
  


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
      <h2>Créer nouvelle offre!</h2>
      <div className="controles-rows">
        <div className="controles no-margin">
          <label>Titre*:</label>
          <input type="titre" name="titre" defaultValue={titre} required />
        </div>
      </div>

      <div className="controles-rows">
        <div className="controles no-margin">
          <label>Email*: </label>
          <input type="email" name="email" defaultValue={email} required />
        </div>
      </div>

      <div className="controles-rows">
        <div className="controles no-margin">
          <label>Nom employeur: </label>
          <input type="nomEmployeur" name="nomEmployeur" defaultValue={nomEmployeur} />
        </div>
      </div>

      <div className="controles-rows">
        <div className="controles no-margin">
          <label>Salaire: </label>
          <input type="salaire" name="salaire" defaultValue={salaire} />
        </div>
      </div>

      <div className="controles-rows">
        <div className="controles no-margin">
          <label>Détails de l'emploi: </label>
          <textarea name="details" cols="60" rows="5" defaultValue={details}></textarea>
        </div>
      </div>

      <div className="controles-rows">
        <div className="controles no-margin">
          <label>Publier cette offre :</label>
          <input type="checkbox" name="published" checked={published} />
        </div>
      </div>

      <p className="form-actions">
        <button className="boutonLog" type="submit">
          Créer
        </button>
        <button className="boutonLog" onClick={() => navigate("/offers-Entrp")}>
          Retour
        </button>
      </p>
    </form>
  );
};

export default AddOffer;
