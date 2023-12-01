import React from "react";
import "./Slide.scss";
import Slider from "infinite-react-carousel";

export const Slide = ({ children, slidesToShow, arrowScroll }) => {
  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowScroll={arrowScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};
