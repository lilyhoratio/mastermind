import React from "react";
// import * as api from "../services/api";

function GuessHistory({ guessesAndFeedbackList }) {
  return (
    <div className="guess-history-container">
      {guessesAndFeedbackList.map((guess, i) => (
        <div key={i} className="guess-and-feedback">
          <span className="guess">{guess.guess} </span>
          <span className="feedback">{guess.feedback} </span>
        </div>
      ))}
    </div>
  );
}

export default GuessHistory;
