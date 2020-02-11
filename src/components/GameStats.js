import React from "react";

function GameStats({ code, guessesAndFeedbackList, showCode, setShowCode }) {
  const handleClick = () => {
    setShowCode(!showCode);
  };

  const generateCode = () => {
    // setShowCode(!showCode);
  };

  let guessesRemaining = 10 - guessesAndFeedbackList.length;
  let heartsRemaining = Array(guessesRemaining).fill("♥ ");

  return (
    <div className="game-stats">
      <div className="integer-combo" onClick={handleClick}>
        {showCode ? code : "Click to view code"}
      </div>
      <div className="new-game-button" onClick={generateCode}>
        Generate new code
      </div>
      <div className="guesses-remaining">{guessesRemaining} guesses left</div>
      <div className="hearts">
        {heartsRemaining.map(heart => (
          <span>{heart}</span>
        ))}
      </div>
    </div>
  );
}

export default GameStats;
