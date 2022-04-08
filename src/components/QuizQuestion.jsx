import React, { useEffect, useRef, useState, useCallback } from "react";
var he = require("he");

const QuizQuestion = (props) => {
  const {
    question,
    correctAnswer,
    totalQuestions,
    currentQuestion,
    timePerQuestion,
    setAnswer,
  } = props;

  const timer = useRef(null);
  const progressBar = useRef(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [options, setOptions] = useState(question.incorrect_answers);
  const arrangeAnswers = () => {
    const answers = [...question.incorrect_answers];
    const correctAnswer = question.correct_answer;
    const randomIndex = getRandomInt(0, 3);
    answers.splice(randomIndex, 0, correctAnswer);
    setOptions(answers);
  };

  const setTimer = useCallback(
    (ref) => {
      progressBar.current = ref;
      if (progressBar.current) {
        if (timePerQuestion === "20") {
          progressBar.current.classList.add("twenty");
        } else if (timePerQuestion === "30") {
          progressBar.current.classList.add("thirty");
        }
      }
    },
    [timePerQuestion]
  );

  const goToNextQuestion = () => {
    console.log(correctAnswer, selectedAnswer);
    setAnswer(correctAnswer === selectedAnswer);
    clearInterval(timer.current);
    if (progressBar.current) {
      progressBar.current.classList.remove("active");
    }
  };

  useEffect(() => {
    arrangeAnswers();
    setSelectedAnswer(null);
    setTimeout(() => {
      if (progressBar.current) {
        progressBar.current.classList.add("active");
      }
    }, 0);
    timer.current = setTimeout(goToNextQuestion, timePerQuestion * 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, [question]);

  return (
    <div className="question">
      <div className="progress-bar" ref={setTimer}></div>
      <div className="question-count">
        <b>{currentQuestion + 1 + " "}</b>
        of
        <b>{" " + totalQuestions}</b>
      </div>

      <div className="main">
        <div className="question-text">
          <span>Question:</span>
          <p>{he.decode(question.question)}</p>
        </div>

        <div className="options">
          {options.map((option) => {
            return (
              <div
                onClick={() => {
                  setSelectedAnswer(option);
                }}
                className={
                  option === selectedAnswer ? "option selected" : "option"
                }
                key={option}
              >
                {he.decode(option)}
              </div>
            );
          })}
        </div>
      </div>
      <div className="control">
        <button
          type="button"
          className="btn btn-primary btn-lg w-100"
          id="next-btn"
          onClick={goToNextQuestion}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
