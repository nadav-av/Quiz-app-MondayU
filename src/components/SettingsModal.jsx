import React from "react";
import "./SettingsModal.css";
import SettingsForm from "./SettingsForm";

const SettingsModal = (props) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="close-btn">
          <button className="close-btn" onClick={() => props.showModal(false)}>
            X
          </button>
        </div>

        <div className="modal-title">
          <h2>Settings</h2>
        </div>
        <div className="modal-content">
          <SettingsForm></SettingsForm>
        </div>
        <div className="modal-footer">
          <button onClick={() => props.showModal(false)}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
