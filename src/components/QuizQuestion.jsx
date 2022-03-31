import React, { useEffect, useRef, useState } from "react";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const QuizQuestion = (props) => {
  const { question, totalQuestions, currentQuestion, setAnswer } = props;
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

  const goToNextQuestion = () => {
    setAnswer(selectedAnswer);
    clearInterval(timer.current);
    progressBar.current.classList.remove("active");
  };

  useEffect(() => {
    arrangeAnswers();
    setTimeout(() => {
      progressBar.current.classList.add("active");
    }, 0);
    timer.current = setTimeout(goToNextQuestion, 10 * 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, [question]);

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
          <p>{question.question}</p>
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
                {option}
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
