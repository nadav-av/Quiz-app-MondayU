import React from "react";
import { useState } from "react";
import QuizScreen from "./components/QuizScreen";
import JoinScreen from "./components/JoinScreen";
import Navbar from "./components/Navbar";

const App = () => {
  const [isQuizstarted, setIsQuizStarted] = useState(false);
  return (
    <React.Fragment>
      <Navbar />
      <div className="quiz-container">
        {isQuizstarted ? (
          <QuizScreen retry={() => setIsQuizStarted(false)} />
        ) : (
          <JoinScreen start={() => setIsQuizStarted(true)} />
        )}
      </div>
    </React.Fragment>
  );
};

export default App;
