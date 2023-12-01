import React from "react";
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
          {/* <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder="Try 'building mobile app' " />
            </div>
            <button>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>Wordpress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div> */}
          <button>Get started</button>
        </div>
        {/* <div className="right">
          <img src="./img/man.png" alt="" />
        </div> */}
      </div>
    </div>
  );
};
