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
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);
  const id = auth.employeurId;

  const { sendRequest } = useHttpClient();
  const location = useLocation();

  const filtreEmp = offres.filter((offre) => offre.employeurId === id);

  // Trouve le type (Employeur ou Candidat)
  useEffect(() => {
    async function infoProfil() {
      try {
        const foundUserData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `users/find/${auth.user}/`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
          }
        );
        setType(foundUserData.users[0].type);
        setEmail(foundUserData.users[0].email);
        console.log(foundUserData);
      } catch (e) {
        console.error(e);
      }
    }
    infoProfil();
  }, [auth.user]);

  // Trouve les offres
  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "offres/"
        );
        setOffres(response.data.offres);
      } catch (err) {
        setError("Erreur lors de la récupération des offres.");
      }
    };
    fetchOffres();
  }, [location.search]);

  // Permettre d'ajouter une offre alors que la liste d'offres est vide
  if (offres.length === 0) {
    return (
      <div>
        {type === "Employeur" ? (
          <NavLink to="/add-offer">Ajouter une offre</NavLink>
        ) : (
          <div>
            <h2>Aucune offre disponible</h2>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {type === "Employeur" ? (
        <div>
          <NavLink to="/add-offer">Ajouter une offre</NavLink>
          {filtreEmp.map((offer) => (
            <OffersItem
              key={offer.id}
              titre={offer.titre}
              nomEmployeur={offer.nomEmployeur}
              email={offer.email}
              salaire={offer.salaire}
              details={offer.details}
              employeurId={offer.employeurId}
            />
          ))}
        </div>
      ) : (
        <div>
          <ul>
            {offres.map((offer) => (
              <OffersItem
                key={offer.id}
                titre={offer.titre}
                nomEmployeur={offer.nomEmployeur}
                email={offer.email}
                salaire={offer.salaire}
                details={offer.details}
                employeurId={offer.employeurId}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OffersList;
