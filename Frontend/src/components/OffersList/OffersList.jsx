import React from "react";
import { useEffect, useContext, useState } from "react";
import OffersItem from "../offersItem/OffersItem";
import { AuthContext } from "../context/AuthContext";
import { useHttpClient } from "../../hooks/http-hook";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import "./OffersList.css";

const OffersList = () => {
  const [offres, setOffres] = useState([]);
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);
  const id = auth.user;

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
        console.log(foundUserData.users[0]);
      } catch (e) {
        console.error(e);
      }
    }
    if (auth.user !== null) {
      infoProfil();
    }
  }, [auth.user]);

  useEffect(() => {
    const fetchOffres = async () => {
      if (type == "Employeur") {
        try {
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + `offres/${id}`
          );
          console.log(response.data.offres);
          setOffres(response.data.offres);
          console.log(offres);
        } catch (err) {
          setError("Erreur lors de la récupération des offres.");
        }
      } else {
        try {
          const response = await axios.get(
            process.env.REACT_APP_BACKEND_URL + "offres/"
          );
          setOffres(response.data.offres);
        } catch (err) {
          setError("Erreur lors de la récupération des offres.");
        }
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
          //Ne marche pas correctement quand l'employeur n'a pas d'offres
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
          <ul className="nav-links">
            <li>
              <NavLink to="/add-offer">Ajouter une offre</NavLink>
            </li>
          </ul>

          {filtreEmp
            .filter((offer) => type === "Employeur" || offer.published)
            .map((offer) => (
              <OffersItem
                key={offer.id}
                id={offer.id}
                titre={offer.titre}
                nomEmployeur={offer.nomEmployeur}
                email={offer.email}
                salaire={offer.salaire}
                details={offer.details}
                employeurId={offer.employeurId}
                emailCandidat={email}
              />
            ))}
        </div>
      ) : (
        <div>
          {offres
            .filter((offer) => offer.published)
            .map((offer) => (
              <OffersItem
                key={offer.id}
                id={offer.id}
                titre={offer.titre}
                nomEmployeur={offer.nomEmployeur}
                email={offer.email}
                salaire={offer.salaire}
                details={offer.details}
                employeurId={offer.employeurId}
                emailCandidat={email}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default OffersList;
