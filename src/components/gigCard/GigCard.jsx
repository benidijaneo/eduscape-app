import React from "react";
import { Link } from "react-router-dom";
import "./GigCard.scss";

export const GigCard = ({ item }) => {
  return (
    <Link to="/gig/123" className="link">
      <div className="gigCard">
        <img src="" alt="" />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{item.star}</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="./img/heart.png" alt="" />
          <span>STARTING AT</span>
          <h2>${item.price}</h2>
        </div>
      </div>
    </Link>
  );
};
