import React, { useState } from "react";
import SettingsModal from "./SettingsModal";

const JoinScreen = (props) => {
  const { start } = props;
  const [show, setShow] = useState(false);

  return (
    <div className="join-screen">
      <h2>Join Quiz</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <button onClick={start}>Start</button>
      <button className="open-Settings" onClick={() => setShow(true)}>
        Settings
      </button>
      {show && <SettingsModal showModal={setShow} />}
    </div>
  );
};

export default JoinScreen;
