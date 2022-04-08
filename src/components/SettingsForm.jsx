import React, { useState } from "react";
import categories from "../data/categories.json";

const SettingsForm = (props) => {
  const { showModal, handleSave } = props;

  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("Easy");
  const [life, setLife] = useState(3);
  const [timer, setTimer] = useState(10);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleLifeChange = (e) => {
    setLife(e.target.value);
  };

  const handleTimerChange = (e) => {
    setTimer(e.target.value);
  };

  const handleSubmit = (category, difficulty, life, timer) => {
    handleSave(category, difficulty, life, timer);
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
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
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

      <div className="form-group">
        <label htmlFor="Select">Select mistakes allowd per round</label>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => handleLifeChange(e)}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="Select">Select timer per question</label>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => handleTimerChange(e)}
        >
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </select>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleSubmit(category, difficulty, life, timer)}
        >
          save
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
