import React, { useState, useContext, useEffect } from "react";
import "./OffersItem.css";
import Popup from "../popup/Popup";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../context/AuthContext";

const OffersItem = (props) => {
    const [btnPopup, setBtnPopup] = useState(false);
    const [btnPopup2, setBtnPopup2] = useState(false);
    const [candidatures, setCandidatures] = useState([]);

    const { sendRequest } = useHttpClient();

    // TO figure out if the array candidatures only contains the ones for the right offer
    const auth = useContext(AuthContext);

    useEffect(() => {
      if (auth.user == props.employeurId) {
        async function listeCandidatures() {
          try {
            const resCandidatures = await sendRequest(
              process.env.REACT_APP_BACKEND_URL + `candidatures/${props.id}/`,
              "GET",
              null,
              {
                "Content-Type": "application/json",
              }
            );
            setCandidatures(resCandidatures.candidatures);
            console.log(candidatures);
          } catch (e) {
            console.error(e);
          }
        }
        listeCandidatures();
      }
    }, [btnPopup]);


    async function addCandidatureSubmitHandler(event) {

        console.log(props.emailCandidat);

        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        const newCandidature = {
          email: props.emailCandidat,
          offreId: props.id,
          candidatId: auth.user,
        };
        
        try {
          await sendRequest(
            process.env.REACT_APP_BACKEND_URL + "candidatures/",
            "POST",
            JSON.stringify(newCandidature),
            { "Content-Type": "application/json" }
          );
        } catch (err) {
          console.error(err);
        }
        console.log(JSON.stringify(newCandidature));
        event.target.reset();

        setBtnPopup2(true);
      }

    return (
        <div>
            <li className="offer-item">
                <div className="offer-item__info">
                    <span className="offer-title" onClick={() => btnPopup ? setBtnPopup(false) : setBtnPopup(true)}>
                        <h2>{props.titre}</h2>
                    </span>
                    <p>Contact: {props.email}</p>
                </div>
            </li>
            {auth.user == props.employeurId ? (
              <div>
                <Popup trigger={btnPopup} setTrigger={setBtnPopup} type="info">
                  <form onSubmit={addCandidatureSubmitHandler}>
                      <h1>{props.titre}</h1>
                      <p>Nom de l'employeur : {props.nomEmployeur}</p>
                      <p>Contact: {props.email}</p>
                      <p>Salaire: {props.salaire} $/h</p>
                      <h5>Détails : </h5>
                      <p>{props.details}</p>

                      <h2>Liste de candidatures : </h2>

                      <ul>

                        {candidatures.length > 0 ? candidatures.map((candidature) => (
                          <li key={candidature.id}>{candidature.email}</li>
                        )) : null}
                      </ul>
                  </form>
                </Popup>
              </div>
            ) : (
              <div>
                <Popup trigger={btnPopup} setTrigger={setBtnPopup} type="info">
                  <form onSubmit={addCandidatureSubmitHandler}>
                      <h1>{props.titre}</h1>
                      <p>Nom de l'employeur : {props.nomEmployeur}</p>
                      <p>Contact: {props.email}</p>
                      <p>Salaire: {props.salaire} $/h</p>
                      <h5>Détails : </h5>
                      <p>{props.details}</p>

                      <button type="submit">Postuler</button>
                  </form>
                </Popup>

                <Popup trigger={btnPopup2} setTrigger={setBtnPopup2} type="confirmation">
                  <h5>Candidature envoyée.</h5>
                  <p>Bonne chance! Tu en auras besoin...</p>
                </Popup>
              </div>
            )}
            
      </div>
    );
};

export default OffersItem;
