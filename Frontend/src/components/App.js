import Register from '../containers/Register';
import Connexion from '../containers/Connexion';
import { useAuthContext } from '../hooks/useAuthContext';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../containers/Roots";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      { path: "/connexion", element: <Connexion />},
      { path: "/register", element: <Register />},
    ],
  },
]);


const App = () => {
  const { user } = useAuthContext();

  if (user) {
    return (
      <RouterProvider router={routes}/>
    );
  } else {
    return (
      <div>
  
      <RouterProvider router={routes}/>
      </div>
    );
  }
  
};

export default App;