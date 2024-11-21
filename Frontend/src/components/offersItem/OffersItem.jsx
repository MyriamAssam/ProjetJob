import React, { useState, useContext, useEffect } from "react";
import "./OffersItem.css";
import Popup from "../popup/Popup";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../context/AuthContext";

const OffersItem = ({ onChange = () => { }, ...props }) => {
  const [btnPopup, setBtnPopup] = useState(false);
  const [btnPopup2, setBtnPopup2] = useState(false);
  const [candidatures, setCandidatures] = useState([]);
  const [postule, setPostule] = useState(false);
  const [publiee, setPubliee] = useState(props.published);
  let pos = 0;

  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  // Charger les candidatures
  useEffect(() => {
    if (auth.user === props.employeurId) {
      async function listeCandidatures() {
        try {
          const resCandidatures = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}candidatures/${props.id}/`,
            "GET",
            null,
            { "Content-Type": "application/json" }
          );
          setCandidatures(resCandidatures.candidatures);
        } catch (e) {
          console.error(e);
        }
      }
      listeCandidatures();
    } else {
      async function listeCandidaturesCandidat() {
        try {
          const resCandidatures = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}candidatures/liste/${auth.user}/`,
            "GET",
            null,
            { "Content-Type": "application/json" }
          );
          setCandidatures(resCandidatures.candidatures);
        } catch (e) {
          console.error(e);
        }
      }
      listeCandidaturesCandidat();
      while (postule === false && pos < candidatures.length) {
        if (candidatures[pos].offreId === props.id) {
          setPostule(true);
        }
        pos++;
      }
    }
  }, [btnPopup]);

  // Gestion du changement de statut des candidatures
  const handleStatusChange = async (event, candidatureId) => {
    const newStatus = event.target.value;

    try {
      const updatedCandidature = { status: newStatus };
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}candidatures/${candidatureId}`,
        "PATCH",
        JSON.stringify(updatedCandidature),
        { "Content-Type": "application/json" }
      );
      setCandidatures((prevCandidatures) =>
        prevCandidatures.map((candidature) =>
          candidature.id === candidatureId
            ? { ...candidature, status: newStatus }
            : candidature
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Gestion de la publication
  const publicationHandler = (event) => {
    const newChecked = event.target.checked;
    setPubliee(newChecked);
  };

  useEffect(() => {
    onChange(publiee);
    async function publication() {
      const updatedOffre = { published: publiee };
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}offres/${props.id}`,
          "PUT",
          JSON.stringify(updatedOffre),
          { "Content-Type": "application/json" }
        );
      } catch (err) {
        console.error(err);
      }
    }
    publication();
  }, [publiee]);

  return (
    <div>
      <li className="offer-item">
        <div className="offer-item__info">
          <span
            className="offer-title"
            onClick={() => setBtnPopup((prev) => !prev)}
          >
            <h2>{props.titre}</h2>
          </span>
          <p>Contact: {props.email}</p>
        </div>
      </li>
      {auth.user === props.employeurId ? (
        <div>
          <Popup trigger={btnPopup} setTrigger={setBtnPopup} type="info">
            <form>
              <h1>{props.titre}</h1>
              <p>Nom de l'employeur : {props.nomEmployeur}</p>
              <p>Contact: {props.email}</p>
              <p>Salaire: {props.salaire} $/h</p>
              <h5>Détails : </h5>
              <p>{props.details}</p>

              <div className="controles-rows">
                <div className="controles no-margin">
                  <label>Publier cette offre :</label>
                  <input
                    type="checkbox"
                    name="published"
                    onChange={publicationHandler}
                    checked={publiee}
                  />
                </div>
              </div>

              {publiee && (
                <ul className="candidatures-list">
                  {candidatures.length > 0 ? (
                    candidatures.map((candidature) => (
                      <li key={candidature.id} className="candidature-item">
                        <span>{candidature.email}</span>
                        <select
                          defaultValue={candidature.status || "en attente"}
                          onChange={(event) =>
                            handleStatusChange(event, candidature.id)
                          }
                        >
                          <option value="en attente">En attente</option>
                          <option value="acceptée">Acceptée</option>
                          <option value="rejetée">Rejetée</option>
                        </select>
                      </li>
                    ))
                  ) : (
                    <li>Aucune candidature trouvée.</li>
                  )}
                </ul>
              )}
            </form>
          </Popup>
        </div>
      ) : (
        <div>
          <Popup trigger={btnPopup} setTrigger={setBtnPopup} type="info">
            <form>
              <h1>{props.titre}</h1>
              <p>Nom de l'employeur : {props.nomEmployeur}</p>
              <p>Contact: {props.email}</p>
              <p>Salaire: {props.salaire} $/h</p>
              <h5>Détails : </h5>
              <p>{props.details}</p>

              {postule === true ? (
                <p>Vous avez postulé</p>
              ) : (
                <button type="submit">Postuler</button>
              )}
            </form>
          </Popup>

          <Popup trigger={btnPopup2} setTrigger={setBtnPopup2} type="confirmation">
            <h5>Candidature envoyée.</h5>
            <p>Bonne chance!</p>
          </Popup>
        </div>
      )}
    </div>
  );
};

export default OffersItem;
