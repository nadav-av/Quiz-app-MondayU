import React from "react";

const JoinScreen = (props) => {
  const { start } = props;
  return (
    <div className="join-screen">
      <h2>Join Quiz</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <button onClick={start}>Start</button>
    </div>
  );
};

export default JoinScreen;
