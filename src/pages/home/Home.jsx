import React from "react";
import "./Home.scss";
import { Featured } from "../../components/featured/Featured";
import { Slide } from "../../components/Slide/Slide";

import { CateCard } from "../../components/cateCard/CateCard";
import { cards } from "../../data";

export const Home = () => {
  return (
    <div className="home">
      <Featured />
      <Slide slidesToShow={5} arrowScroll={5}>
        {cards.map((card) => (
          <CateCard key={card.id} item={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>Why choose us?</h1>
            <div className="title">
              <img src="./img/check.png" />
              Skill-Based Tutoring
            </div>
            <p>
              EduScape welcomes individuals with exceptional skills to become
              tutors, regardless of formal credentials.
            </p>
            <div className="title">
              <img src="./img/check.png" />
              Inclusive Opportunities
            </div>
            <p>
              Unlock tutoring opportunities for those with zero credentials,
              empowering skilled individuals to share their knowledge.
            </p>
            <div className="title">
              <img src="./img/check.png" />
              Money-Back Guarantee
            </div>
            <p>
              Clients enjoy a risk-free experience with our money-back
              guarantee, ensuring satisfaction and quality in every tutoring
              session.
            </p>
            <div className="title">
              <img src="./img/check.png" />
              Affordable Learning
            </div>
            <p>
              Benefit from budget-friendly tutoring without compromising on
              quality, making education accessible to everyone.
            </p>
          </div>
          <div className="item">
            <div className="triple-e">
              <h1>EDUSCAPE.</h1>
              <h1>ELEVATE.</h1>
              <h1>EDUCATION.</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
