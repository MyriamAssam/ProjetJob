import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import EntrepOffers from "../containers/EntrepriseEmplois";
import Register from "../containers/Register";
import Connexion from "../containers/Connexion";
import { useAuthContext } from "../hooks/useAuthContext";
import RootLayout from "../containers/Roots";
import OffersList from "../components/OffersList/OffersList";
import axios from "axios";

const App = () => {
  const { user } = useAuthContext();
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/offres");
        setOffers(response.data.offres);
      } catch (err) {
        setError("Erreur lors de la récupération des offres.");
      }
    };
    fetchOffers();
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Navigate to="/connexion" /> },
        { path: "/connexion", element: <Connexion /> },
        { path: "/register", element: <Register /> },
        { path: "/offers-Entrp", element: <EntrepOffers /> },
        { path: "/offres", element: <OffersList items={offers} /> },
      ],
    },
  ]);

  return (
    <div>
      {error && <div>{error}</div>}
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
