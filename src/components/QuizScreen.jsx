import React, { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion.jsx";
import QuizResult from "./QuizResult.jsx";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import Lifes from "./Lifes.jsx";

const QuizScreen = (props) => {
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const {
    retry,
    category,
    difficulty,
    MaxMistakes: maxMistakes,
    timePerQuestion,
  } = props;
  const [isAlive, setIsAlive] = useState(3);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const isQuestionEnd = currentQuestionIndex === questionList.length;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty.toLowerCase()}`
        );
        setQuestionList(response.data.results);
        setIsAlive(maxMistakes);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, [category, difficulty, maxMistakes]);

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

  return (
    <div className="quiz-screen">
      {isQuestionEnd || isAlive < 1 ? (
        <QuizResult
          difficulty={difficulty}
          maxMistakes={maxMistakes}
          correctAnswers={correctAnswers}
          qstLength={questionList.length}
          lifes={isAlive}
          time={timePerQuestion}
          retry={retry}
        />
      ) : (
        <React.Fragment>
          <Lifes howManyLeft={isAlive} />
          <QuizQuestion
            question={questionList[currentQuestionIndex]}
            correctAnswer={questionList[currentQuestionIndex].correct_answer}
            totalQuestions={questionList.length}
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
