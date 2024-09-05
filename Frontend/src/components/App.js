import Register from '../containers/Register';
import Connexion from '../containers/Connexion';
import { AuthContext } from './context/AuthContext';
import NavLinks from './navigation/NavLinks';
import { useContext } from 'react';

function App() {
  const auth = useContext(AuthContext);

  return (
    <div>
      { }
      <NavLinks />

      { }
      {!auth.isLoggedIn ? (
        <Connexion />
      ) : (
        <Register />
      )}
    </div>
  );
}

export default App;