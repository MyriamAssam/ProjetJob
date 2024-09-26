import React from "react";
import { useEffect, useContext, useState } from "react";
import OffersItem from "../offersItem/OffersItem";
import { AuthContext } from "../context/AuthContext";
import { useHttpClient } from "../../hooks/http-hook";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

const OffersList = () => {

  const [offres, setOffres] = useState([]);
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const location = useLocation();

  useEffect(() => {
    async function infoProfil() {
      try {
        const foundUserData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `users/find/${auth.user}`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
          }
        );
        setType(foundUserData.users[0].type);
        console.log(foundUserData);
      } catch (e) {
        console.error(e);
      }
    }
    infoProfil();
  }, [auth.user]);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND +'offres/');
        setOffres(response.data.offres);
      } catch (err) {
        setError("Erreur lors de la récupération des offres.");
      }
    };
    fetchOffres();
  }, [location.search]);


  if (offres.length === 0) {
    return (
      <div>
        {type == "Employeur" ? (
          <NavLink to="/add-offer">Ajouter une offre</NavLink>
        ) : (
          <div></div>
        )}
        <h2>Aucune offre disponible</h2>
      </div>
    );
  }


  return (
    <div>
      {type == "Employeur" ? (
        <NavLink to="/add-offer">Ajouter une offre</NavLink>
      ) : (
        <div></div>
      )}
      <ul>
        {offres.map((offer) => (
          <OffersItem
            key={offer.id}
            titre={offer.titre}
            email={offer.email}
            employeurId={offer.employeurId}

          />
        ))}
      </ul>
    </div>
  );
};

export default OffersList;
