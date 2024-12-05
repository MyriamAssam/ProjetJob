import React, { useState, useContext, useEffect } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

const ListeSoumission = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest } = useHttpClient();
  const [soumissions, setSoumissions] = useState([]);
  const [recharger, setRecharger] = useState(false);

  useEffect(() => {
    async function listeSoumissions() {
      try {
        const resSoumissions = await sendRequest(
          process.env.REACT_APP_BACKEND_URL +
            `candidatures/liste/${auth.user}/`,
          "GET",
          null,
          { "Content-Type": "application/json" }
        );
        setSoumissions(resSoumissions.candidatures);
        console.log(soumissions);
        console.log(resSoumissions.candidatures);
      } catch (error) {
        console.log(error);
      }
    }
    listeSoumissions();
    console.log(soumissions);
    setRecharger(!recharger);
  }, recharger);

  async function addSoumissionSubmitHandler(event) {
    console.log(props.emailEmployeur);

    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const newSoumission = {
      email: props.emailEmployeur,
      employeurId: auth.user,
      offreId: props.id,
      titreOffre: props.titre,
    };
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "candidatures/",
        "POST",
        JSON.stringify(newSoumission),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error(error);
    }
    console.log(JSON.stringify(newSoumission));
    event.target.reset();

  }

  async function deleteSoumissionSubmitHandler(event, candidatureId, titre) {
    event.preventDefault();
    console.log(candidatureId);
    console.log(titre);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `candidatures/${candidatureId}`,
        "DELETE",
        JSON.stringify(props.id),
        { "Content-Type": "application/json" }
      );
    } catch (error) {
      console.error(error);
    }
    setRecharger(!recharger);
    console.log(recharger);
    //navigate(`/listeSoumission?refresh=${recharger}`);

  }

  return (
    <div>
      <button className="boutonLog" onClick={() => navigate("/offres")}>
        Retour
      </button>
      <form onSubmit={addSoumissionSubmitHandler}>
        <h1>Liste de postulations:</h1>
        <br />
        <ul>
          {soumissions.length > 0 ? (
            soumissions.map((soumission) => (
              <li key={soumission.id}>
                <span>{soumission.titre}</span>
                <button
                  onClick={(e) =>
                    deleteSoumissionSubmitHandler(e, soumission.id, soumission.titre)
                  }
                >
                  Retirer
                </button>
              </li>
            ))
          ) : (
            <li>Aucune postulation faite.</li>
          )}
        </ul>
      </form>
    </div>
  );
};

export default ListeSoumission;
