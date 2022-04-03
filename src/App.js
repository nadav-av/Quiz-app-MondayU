import React from "react";
import { useState } from "react";
import QuizScreen from "./components/QuizScreen";
import JoinScreen from "./components/JoinScreen";
import Navbar from "./components/Navbar";

const App = () => {
  const [isQuizstarted, setIsQuizStarted] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("General Knowledge");
  const [currentDifficulty, setCurrentDifficulty] = useState("Easy");

  const handleCategoryChange = (value) => {
    setCurrentCategory(value);
    console.log(value);
  };

  const handleDifficultyChange = (value) => {
    setCurrentDifficulty(value);
    console.log(value);
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="quiz-container">
        {isQuizstarted ? (
          <QuizScreen
            retry={() => setIsQuizStarted(false)}
            category={currentCategory}
            difficulty={currentDifficulty}
          />
        ) : (
          <JoinScreen
            start={() => setIsQuizStarted(true)}
            catChange={handleCategoryChange}
            difChange={handleDifficultyChange}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default App;
