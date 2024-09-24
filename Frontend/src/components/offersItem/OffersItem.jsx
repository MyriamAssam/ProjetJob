import React from "react";
import "./OffersItem.css";

const OffersItem = (props) => {
    return (
        <li className="offer-item">
            <div className="offer-item__info">
                <h2>{props.titre}</h2>
                <p>{props.employeurId}</p>
            </div>
        </li>
    );
};

export default OffersItem;
