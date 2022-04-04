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
          className="form-select"
          aria-label="Default select example"
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
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => handleDifficultyChange(e)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          onClick={() => handleSubmit(category, difficulty)}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
