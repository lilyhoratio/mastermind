import React from "react";

function GameStats({
  integerCombo,
  guessesAndFeedbackList,
  showIntegerCombo,
  setShowIntegerCombo
}) {
  const handleClick = () => {
    setShowIntegerCombo(!showIntegerCombo);
  };

  let guessesRemaining = 10 - guessesAndFeedbackList.length;
  let heartsRemaining = Array(guessesRemaining).fill("❤ ");

  return (
    <div className="game-stats">
      <div
        className={`integer-combo${showIntegerCombo ? "-show" : "-hide"}`}
        onClick={handleClick}
      >
        {showIntegerCombo ? integerCombo : "Click to view answer"}
      </div>
      <div className="guesses-remaining">
        Guesses remaining: {guessesRemaining}
      </div>
      <div>
        {heartsRemaining.map(heart => (
          <span>{heart}</span>
        ))}
      </div>
    </div>
  );
}

export default GameStats;
