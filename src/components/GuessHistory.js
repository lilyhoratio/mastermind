import React, { useState, useEffect } from "react";
// import * as api from "../services/api";

function GuessHistory({ guessesAndFeedbackList }) {
  return (
    <div>
      {guessesAndFeedbackList.map(guess => (
        <div>
          <span>{guess.guess} </span>
          <span>{guess.feedback} </span>
        </div>
      ))}
    </div>
  );
}

export default GuessHistory;
