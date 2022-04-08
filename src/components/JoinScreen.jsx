import React, { useState } from "react";
import SettingsModal from "./SettingsModal";

const JoinScreen = (props) => {
  const { start, catChange, difChange, lifeChange, timerChange } = props;
  const [settingsModalShow, setSettingsModalShow] = useState(false);

  return (
    <div className="join-screen">
      <h2>AnyQuiz</h2>
      <p>
        Go to the setting, choose your category and difficulty level, and start
        playing!
      </p>
      <button type="button" className="btn btn-outline-primary" onClick={start}>
        Start
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => setSettingsModalShow(true)}
      >
        Settings
      </button>
      {settingsModalShow && (
        <SettingsModal
          showModal={setSettingsModalShow}
          catChange={catChange}
          difChange={difChange}
          lifeChange={lifeChange}
          timerChange={timerChange}
        />
      )}
    </div>
  );
};

export default JoinScreen;
