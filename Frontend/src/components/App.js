import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import EntrepOffers from "../containers/EntrepriseEmplois";
import Register from "../containers/Register";
import Connexion from "../containers/Connexion";
import AddOffer from "../containers/AddOffer";
import RootLayout from "../containers/Roots";
import OffersList from "../components/OffersList/OffersList";
import ListeSoumission from "../containers/ListeSoumissions";

const App = () => {
  const [error, setError] = useState(null);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Navigate to="/connexion" /> },
        { path: "/connexion", element: <Connexion /> },
        { path: "/register", element: <Register /> },
        { path: "/offers-Entrp", element: <EntrepOffers /> },
        { path: "/offres", element: <OffersList /> },
        { path: "/listeSoumission", element: <ListeSoumission /> },
        { path: "/add-offer", element: <AddOffer /> },
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
