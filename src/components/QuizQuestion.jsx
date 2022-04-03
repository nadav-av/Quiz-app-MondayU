import React, { useEffect, useRef, useState, useCallback } from "react";
var he = require("he");

const QuizQuestion = (props) => {
  const { question, totalQuestions, currentQuestion, setAnswer } = props;
  const timer = useRef(null);
  const progressBar = useRef(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [options, setOptions] = useState(question.incorrect_answers);

  const arrangeAnswers = useCallback(() => {
    const answers = [...question.incorrect_answers];
    const correctAnswer = question.correct_answer;
    const randomIndex = getRandomInt(0, 3);
    answers.splice(randomIndex, 0, correctAnswer);
    setOptions(answers);
  }, [question.incorrect_answers, question.correct_answer]);

  const goToNextQuestion = useCallback(() => {
    setAnswer(selectedAnswer);
    clearInterval(timer.current);
    progressBar.current.classList.remove("active");
  }, [selectedAnswer, setAnswer]);

  useEffect(() => {
    arrangeAnswers();
    setTimeout(() => {
      progressBar.current.classList.add("active");
    }, 0);
    timer.current = setTimeout(goToNextQuestion, 10 * 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, [arrangeAnswers, goToNextQuestion]);

  return (
    <div className="question">
      <div className="progress-bar" ref={progressBar}></div>
      <div className="question-count">
        <b>{currentQuestion + " "}</b>
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
        <button className="btn-next" onClick={goToNextQuestion}>
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
