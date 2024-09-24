import React from "react";
import { useContext } from "react";
import OffersItem from "../offersItem/OffersItem";
import { AuthContext } from "../context/AuthContext";

const OffersList = ({ items }) => {

  const auth = useContext(AuthContext);

  if (items.length === 0) {
    return <h2>Aucune offre disponible</h2>;
  }

  return (
    <ul>
      {items.map((offer) => (
        <OffersItem
          key={offer.id}
          titre={offer.titre}
          email={offer.email}
          employeurId={offer.employeurId}

        />
      ))}
    </ul>
  );
};

export default OffersList;
