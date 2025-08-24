import React from "react";
import OFFRES from "../components/data/offers";
import { AuthContext } from "../components/context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ListeOffres from "../components/OffersList/OffersList";

const EntrepriseEmplois = () => {
  const auth = useContext(AuthContext);
  const id = auth.employeurId;
  const filtreJobs = OFFRES.filter((offre) => offre.employeurId === id);

  return <ListeOffres items={filtreJobs} />;
};

export default EntrepriseEmplois;
