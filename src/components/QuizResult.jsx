import React, { useState, useEffect, useCallback } from "react";
import DifficultMapping from "../data/difficultMapping.json";

const Default_BestScore = 0;

const QuizResult = (props) => {
  const {
    difficulty,
    maxMistakes,
    correctAnswers,
    qstLength,
    lifes,
    time,
    retry,
  } = props;
  const [currentBestScore, setCurrentBestScore] = useState(Default_BestScore);
  const [currentScore, setCurrentScore] = useState(0);
  const [isNewBestScore, setIsNewBestScore] = useState(false);
  const [currentPrecent, setCurrentPrecent] = useState(0);

  const getDifficultMult = () => {
    const res = DifficultMapping.find((item) => item.Difficulty === difficulty);
    return res.ScoreMult;
  };

  const calculateResult = useCallback(() => {
    const mult = getDifficultMult();
    const div = parseInt(maxMistakes);
    const precentage = Math.trunc((correctAnswers / qstLength) * 100);
    setCurrentPrecent(precentage);
    let score = Math.trunc((mult * precentage) / (div + time));
    if (lifes !== 0) {
      score *= lifes;
    }
    setIsNewBestScore(checkAndSaveBestScore(score));
    setCurrentScore(score);
  }, [correctAnswers, qstLength, maxMistakes, time, lifes]);

  const checkAndSaveBestScore = (score) => {
    console.log("Inside: ", currentBestScore, score);
    if (score > currentBestScore) {
      setCurrentBestScore(score);
      return true;
    } else {
      return false;
    }
  };

  const renderBestScore = () => {
    if (isNewBestScore) {
      return (
        <div className="best-score">
          <h1>New Best Score</h1>
        </div>
      );
    }
  };

  useEffect(() => {
    console.log("Inside useEffect");
    calculateResult();
    localStorage.setItem("BestScore", JSON.stringify(currentBestScore));
  }, [correctAnswers, qstLength, maxMistakes, lifes, time, currentBestScore]);

  return (
    <div className="result-screen">
      {renderBestScore()}
      <h2>Result: {currentPrecent}%</h2>
      <p>
        You got {correctAnswers} out of {qstLength} questions
      </p>
      <p>You got {currentScore} points</p>
      <button type="button" className="btn btn-outline-dark" onClick={retry}>
        Try Again
      </button>
    </div>
  );
};

export default QuizResult;
