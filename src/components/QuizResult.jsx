import React from "react";

const QuizResult = (props) => {
  const { score, retry } = props;
  return (
    <div className="result-screen">
      <h2>Result: {score.precentage}%</h2>
      <p>
        You got {score.correct} out of {score.total} questions
      </p>
      <button onClick={retry}>Retry</button>
    </div>
  );
};

export default QuizResult;
