import "./Navigation.css";
import NavLinks from "./NavLinks";

const Navigation = () => {
  return (
    <>
      <header className="main-entete">
        <h1 className="main-navigation_titre">Bienvenue à JoBang!</h1>
        <nav className="main-navigation_entete-nav">
          <NavLinks />
        </nav>
      </header>
    </>
  );
};

export default Navigation;
