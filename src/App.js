import React from "react";
import { useState, useEffect } from "react";
import QuizScreen from "./components/QuizScreen";
import JoinScreen from "./components/JoinScreen";

const Default_Category = 9; //General Knowledge
const Default_Difficulty = "Easy";
const Default_Life = 3;
const Defauly_Timer = 10;

const App = () => {
  const [isQuizstarted, setIsQuizStarted] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(Default_Category);
  const [currentDifficulty, setCurrentDifficulty] =
    useState(Default_Difficulty);
  const [currentLife, setCurrentLife] = useState(Default_Life);
  const [currentTimer, setCurrentTimer] = useState(Defauly_Timer);

  const handleCategoryChange = (value) => {
    setCurrentCategory(value);
  };

  const handleDifficultyChange = (value) => {
    setCurrentDifficulty(value);
  };

  const handleLifeChange = (value) => {
    setCurrentLife(value);
  };

  const handleTimerChange = (value) => {
    setCurrentTimer(value);
  };

  useEffect(() => {
    localStorage.setItem("currentCategory", JSON.stringify(currentCategory));
    localStorage.setItem(
      "currentDifficulty",
      JSON.stringify(currentDifficulty)
    );
    localStorage.setItem("currentLife", JSON.stringify(currentLife));
    localStorage.setItem("currentTimer", JSON.stringify(currentTimer));
  }, [currentCategory, currentDifficulty, currentLife, currentTimer]);

  return (
    <React.Fragment>
      <div className="quiz-container">
        {isQuizstarted ? (
          <QuizScreen
            retry={() => setIsQuizStarted(false)}
            category={currentCategory}
            difficulty={currentDifficulty}
            MaxMistakes={currentLife}
            timePerQuestion={currentTimer}
          />
        ) : (
          <JoinScreen
            start={() => setIsQuizStarted(true)}
            catChange={handleCategoryChange}
            difChange={handleDifficultyChange}
            lifeChange={handleLifeChange}
            timerChange={handleTimerChange}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default App;
