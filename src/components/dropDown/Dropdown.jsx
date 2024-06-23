import React from "react";
import "./Dropdown.scss";
import facebook from "/img/facebook.png";
import gmail from "/img/gmail.png";
import linkedin from "/img/linkedin.png";

const Dropdown = ({ dataUser }) => {
  return (
    <div className="contact-list">
      <a target="_blank" rel="noreferrer" href={dataUser.facebook}>
        <img className="contact-img" src={facebook} />
      </a>
      <a target="_blank" rel="noreferrer" href="/messages">
        <img className="contact-img" src={gmail} />
      </a>
      <a target="_blank" rel="noreferrer" href={dataUser.linkedin}>
        <img className="contact-img" src={linkedin} />
      </a>
    </div>
  );
};

export default Dropdown;
