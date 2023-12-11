import React from "react";
import "./Footer.scss";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Subjects</h2>
            <span>English</span>
            <span>Mathematics</span>
            <span>Philosophy</span>
            <span>Science</span>
            <span>Social Studies</span>
          </div>

          <div className="item">
            <div className="newsletter">
              <div className="left">
                <div className="inner-container">
                  <h1>Hey, there.</h1>
                  <h3>
                    Elevate Your Learning Journey! Subscribe for Exclusive
                    Updates & Educational Insights.
                  </h3>
                  <p></p>
                  <div className="form-group">
                    <input type="text" placeholder="example@email.com" />
                    <button>Subscribe</button>
                  </div>
                </div>
              </div>
              <div className="right">
                <img
                  src="./img/ai-robot-hand-innovation-in-the-future-of-technology.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>EduScape</h2>
            <span>© Copyright 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="img/twitter.png" alt="" />
              <img src="img/facebook.png" alt="" />
              <img src="img/linkedin.png" alt="" />
              <img src="img/pinterest.png" alt="" />
              <img src="img/instagram.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
