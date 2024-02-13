import React from "react";
import { Link } from "react-router-dom";
import "./CateCard.scss";

export const CateCard = ({ item }) => {
  return (
    <div className="cateCard">
      <img src={item.img} alt="" />
      <span className="desc">{item.desc}</span>
      <span className="title">{item.title}</span>
    </div>
  );
};
