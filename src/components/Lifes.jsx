import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Lifes = (props) => {
  const { howManyLeft } = props;

  const renderLifes = () => {
    let lifes = [];
    for (let i = 0; i < howManyLeft; i++) {
      lifes.push(
        <FontAwesomeIcon
          key={i}
          icon={faHeart}
          color={"#E30000"}
          className="life-icon"
        />
      );
    }
    return lifes;
  };
  return (
    <div className="life-container">
      {renderLifes().map((life) => {
        return life;
      })}
    </div>
  );
};

export default Lifes;
