import React from "react";

const QuizResult = (props) => {
  const { result, retry } = props;
  return (
    <div className="result-screen">
      <h2>Result: {result.precentage}%</h2>
      <p>
        You got {result.correct} out of {result.total} questions
      </p>
      <p>You got {result.score} points</p>
      <button type="button" className="btn btn-outline-dark" onClick={retry}>
        Try Again
      </button>
    </div>
  );
};

export default QuizResult;
