import { OFFER } from "../components/data/offers";
import { AuthContext } from "../components/context/AuthContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

const AddOffer = () => {
  const auth = useContext(AuthContext);
  function addOfferSubmitHandler(event) {
    event.preventDefault();
    const inputs = new FormData(event.target);
    const data = Object.fromEntries(inputs.entries());
    console.log("Title: ", data.title);
    console.log("Description: ", data.description);

    event.target.reset();
    let newOffer = {
      id: OFFER.length + 1,
      title: data.title,
      description: data.description,
      creator: auth.userId,
    };
    console.log(newOffer);
    OFFER.push(newOffer);
  }

  return (
    <form onSubmit={addOfferSubmitHandler}>
      <h2>Ajouter une offre</h2>
      <div>
        <label htmlFor="title">Titre de l'offre</label>
        <input id="title" type="text" name="title" required />
      </div>
      <div>
        <label htmlFor="description">Description de l'offre</label>
        <input id="description" type="text" name="description" required />
      </div>
      <div>
        <button className="bouton boutonReset" type="reset">
          Reset
        </button>
        <button className="bouton" type="submit">
          Add
        </button>
      </div>
      <div>
        <Link to={"/offers-Entrp"}>
          <button>Voir mes offres</button>
        </Link>
      </div>
    </form>
  );
};

export default AddOffer;
