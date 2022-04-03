import React from "react";
import "./SettingsModal.css";
import SettingsForm from "./SettingsForm";

const SettingsModal = (props) => {
  const { showModal, catChange, difChange } = props;

  const handleSave = (category, difficulty) => {
    catChange(category);
    difChange(difficulty);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="close-btn">
          <button className="close-btn" onClick={() => showModal(false)}>
            X
          </button>
        </div>

        <div className="modal-title">
          <h2>Settings</h2>
        </div>
        <div className="modal-content">
          <SettingsForm
            handleSave={handleSave}
            showModal={showModal}
          ></SettingsForm>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
