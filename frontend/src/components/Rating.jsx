import React from "react";

const Rating = ({ rating, text }) => {
  return (
    <div className="rating">
      {[0, 1, 2, 3, 4].map((number, index) => (
        <i
          key={index}
          style={{ color: "yellow" }}
          className={
            rating - number >= 1
              ? "fas fa-star"
              : rating - number >= 0.5
              ? "fas fa-star-half-alt"
              : "fas fa-start"
          }
        ></i>
      ))}
      <span>{text}</span>
    </div>
  );
};

export default Rating;
