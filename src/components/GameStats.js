import React from "react";

function GameStats({ integerCombo, guessesAndFeedbackList }) {
  return (
    <div className="game-stats">
      <div className="integer-combo">Correct combination: {integerCombo} </div>
      <div className="guesses-remaining">
        Guesses remaining: {10 - guessesAndFeedbackList.length}
      </div>
    </div>
  );
}

export default GameStats;
