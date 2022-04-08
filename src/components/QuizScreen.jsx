import React, { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion.jsx";
import QuizResult from "./QuizResult.jsx";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import Lifes from "./Lifes.jsx";
import DifficultMapping from "../data/difficultMapping.json";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";

const QuizScreen = (props) => {
  const [QuestionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { category, difficulty, MaxMistakes, timePerQuestion } = props;
  const [isAlive, setIsAlive] = useState(3);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty.toLowerCase()}`
        );
        setQuestionList(response.data.results);
        setIsAlive(MaxMistakes);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, [category, difficulty, MaxMistakes]);

  if (isLoading) {
    return (
      <div className="sweet-loading" id="loader">
        <HashLoader
          size={100}
          color={"#0AD0AF"}
          loading={isLoading}
          speedMultiplier={2.4}
        />
      </div>
    );
  }
  const isQuestionEnd = currentQuestionIndex === QuestionList.length;
  const { retry } = props;

  const getDifficultMult = () => {
    const res = DifficultMapping.find((item) => item.Difficulty === difficulty);
    return res.ScoreMult;
  };

  const calculateResult = () => {
    const mult = getDifficultMult();
    const div = parseInt(MaxMistakes);
    const _precentage = Math.trunc(
      (correctAnswers / QuestionList.length) * 100
    );

    console.log(mult, _precentage, div, timePerQuestion, isAlive);
    let _score = Math.trunc((mult * _precentage) / (div + timePerQuestion));
    if (isAlive !== 0) {
      _score *= isAlive;
    }

    return {
      correct: correctAnswers,
      total: QuestionList.length,
      precentage: _precentage,
      score: _score,
    };
  };

  return (
    <div className="quiz-screen">
      {isQuestionEnd || isAlive < 1 ? (
        <QuizResult result={calculateResult()} retry={retry} />
      ) : (
        <React.Fragment>
          <Lifes howManyLeft={isAlive} />
          <QuizQuestion
            question={QuestionList[currentQuestionIndex]}
            correctAnswer={QuestionList[currentQuestionIndex].correct_answer}
            totalQuestions={QuestionList.length}
            currentQuestion={currentQuestionIndex}
            timePerQuestion={timePerQuestion}
            setAnswer={(isCorrect) => {
              if (isCorrect) {
                setCorrectAnswers(correctAnswers + 1);
              } else {
                setIsAlive(isAlive - 1);
              }
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default QuizScreen;
