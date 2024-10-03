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
      email: data.email,
      details: data.details,
      employeurId: auth.user,
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
        <label>Titre:</label>
        <input type="titre" name="titre" required />
      </div>
      <div>
        <label>Email: </label>
        <input type="email" name="email" required />
      </div>

      <div>
        <label>Détails de l'emploi: </label>
        <textarea name="details" cols="60" rows="5"></textarea>
      </div>

      <button type="submit">Créer</button>
      <button onClick={() => navigate("/offers-Entrp")}>Retour</button>
    </form>
  );
};

export default AddOffer;
