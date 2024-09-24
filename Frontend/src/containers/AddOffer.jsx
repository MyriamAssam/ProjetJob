import React, { useState, useEffect, useContext } from "react";
import OffersList from "../components/OffersList/OffersList";
import { AuthContext } from "../components/context/AuthContext";

const AddOffer = () => {
  const [offers, setOffres] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        let url = "http://localhost:5000/offres/";


        if (auth.user?.role === "employeur") {
          url = `http://localhost:5000/offres/employeur/${auth.user.id}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des offres");
        }

        const data = await response.json();
        if (data && data.offers) {
          setOffres(data.offers);
        } else {
          console.error("Aucune offre trouvée dans la réponse");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchOffres();
  }, [auth.user]);

  return (
    <div>
      <OffersList items={offers} />
    </div>
  );
};

export default AddOffer;
