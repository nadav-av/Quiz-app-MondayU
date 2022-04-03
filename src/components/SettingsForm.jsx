import React from "react";

const SettingsForm = (props) => {
  return (
    <form>
      <div className="form-group">
        <label for="Select">Select Category</label>
        <select id="Select" className="form-control">
          <option>General Knowledge</option>
          <option>Science: Computers</option>
          <option>History</option>
          <option>Sports</option>
        </select>
      </div>
      <div className="form-group">
        <label for="Select">Select Difficulty</label>
        <select id="Select" className="form-control">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
    </form>
  );
};

export default SettingsForm;
