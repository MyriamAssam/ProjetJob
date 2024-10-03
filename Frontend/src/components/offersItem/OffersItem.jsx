import React, { useState } from "react";
import "./OffersItem.css";
import Popup from "../popup/Popup";

const OffersItem = (props) => {
    const [btnPopup, setBtnPopup] = useState(false);

    // TO ADD salaire and name as infos
    return (
        <div>
            <li className="offer-item">
                <div className="offer-item__info">
                    <span className="offer-title" onClick={() => btnPopup ? setBtnPopup(false) : setBtnPopup(true)}>
                        <h2>{props.titre}</h2>
                    </span>
                    <p>Contact: {props.email}</p>
                </div>
            </li>

            <Popup trigger={btnPopup} setTrigger={setBtnPopup}>
                <h1>{props.titre}</h1>
                <p>Nom de l'employeur : </p>
                <p>Contact: {props.email}</p>
                <p>Salaire: </p>
                <h5>Détails :</h5>
                <p>kghfjskljhfskldgjsdklgjdsklgjklsdgjklgjsdklsjgklgfksdkgfdsklgjsklgjklsfklfsgdklfgjlkdsjgklfdgsdkl</p>
            </Popup>
        </div>
    );
};

export default OffersItem;
