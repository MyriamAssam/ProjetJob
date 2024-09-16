import React from "react";
import "./OffersItem.css";

const OffersItem = (props) => {
    return (
        <li className="offer-item">
            <div className="offer-item__info">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
        </li>
    );
};

export default OffersItem;
