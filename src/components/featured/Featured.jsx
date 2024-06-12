import React from "react";
import { Link } from "react-router-dom";
import "./Featured.scss";

export const Featured = () => {
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>Traverse Knowledge.</h1>
          <p>
            Embark on a Learning Odyssey with <i>EduScape</i>.
          </p>

          <Link to={"/gigs?cat"}>
            <button>Get started</button>
          </Link>
        </div>
        <div className="right">
          <img src="./img/hero-img.svg" alt="" />
        </div>
      </div>
    </div>
  );
};
