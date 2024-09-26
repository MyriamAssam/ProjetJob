import React from "react";
import OFFRES from "../components/data/offers";
import { AuthContext } from "../components/context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ListeOffres from "../components/OffersList/OffersList";

const EntrepriseEmplois = () => {
  const auth = useContext(AuthContext);
  const id = auth.userId;
  const filtreJobs = OFFRES.filter((offre) => offre.creator === id);
  return (
    <div>
      <ListeOffres items={filtreJobs} />
      <Link to={"/add-offer"}>
        <button>Ajouter un autre emploi</button>
      </Link>
    </div>
  );
};

export default EntrepriseEmplois;
