import React from "react";
import OffersItem from "../offersItem/OffersItem";

const OffersList = ({ items }) => {
  if (items.length === 0) {
    return <h2>Aucune offre disponible</h2>;
  }

  return (
    <ul>
      {items.map((offer) => (
        <OffersItem
          key={offer.id}
          creator={offer.creator}
          title={offer.title}
          description={offer.description}
        />
      ))}
    </ul>
  );
};

export default OffersList;
