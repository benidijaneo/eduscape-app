import React from "react";
import "./Dropdown.scss";
import facebook from "/img/facebook.png";
import gmail from "/img/gmail.png";
import linkedin from "/img/linkedin.png";

const Dropdown = () => {
  return (
    <div className="contact-list">
      <a to="/orders">
        <img className="contact-img" src={facebook} />
      </a>
      <a to="/messages">
        <img className="contact-img" src={gmail} />
      </a>
      <a>
        <img className="contact-img" src={linkedin} />
      </a>
    </div>
  );
};

export default Dropdown;
