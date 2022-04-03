import React, { useState } from "react";

const SettingsForm = (props) => {
  const { showModal, handleSave } = props;

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleSubmit = (category, difficulty) => {
    handleSave(category, difficulty);
    showModal(false);
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="Select">Select Category</label>
        <select
          id="Select"
          className="form-control"
          onChange={(e) => handleCategoryChange(e)}
        >
          <option>General Knowledge</option>
          <option>Science: Computers</option>
          <option>History</option>
          <option>Sports</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="Select">Select Difficulty</label>
        <select
          id="Select"
          className="form-control"
          onChange={(e) => handleDifficultyChange(e)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <div className="modal-footer">
        <button onClick={() => handleSubmit(category, difficulty)}>Save</button>
      </div>
    </form>
  );
};

export default SettingsForm;
