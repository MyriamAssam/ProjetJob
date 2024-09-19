import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AddOffer from "../containers/AddOffer";
import EntrepOffers from "../containers/EntrepriseItems";
import Register from "../containers/Register";
import Connexion from "../containers/Connexion";
import { useAuthContext } from "../hooks/useAuthContext";
import RootLayout from "../containers/Roots";
import OffersList from "../components/OffersList/OffersList";
import { OFFER } from "./data/offers";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Navigate to="/connexion" /> }, // Redirection vers /connexion
      { path: "/connexion", element: <Connexion /> },
      { path: "/register", element: <Register /> },
      { path: "/add-offer", element: <AddOffer /> },
      { path: "/offers-Entrp", element: <EntrepOffers /> },
      { path: "/offres", element: <OffersList items={OFFER} /> }, // Ajout de la route pour les offres
    ],
  },
]);

const App = () => {
  const { user } = useAuthContext();

  return <RouterProvider router={routes} />;
};

export default App;
