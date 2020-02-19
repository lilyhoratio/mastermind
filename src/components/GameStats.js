import React, { useState } from "react";
import GameDifficultyForm from "./GameDifficultyForm";

function GameStats({
  isLoading,
  code,
  guessesAndFeedbackList,
  showCode,
  setShowCode,
  withClippy,
  allowedGuesses,
  resetGame,
  setDifficulty,
  setTemporaryStyle
}) {
  const handleClick = () => {
    setShowCode(!showCode);
  };

  let guessesRemaining = allowedGuesses - guessesAndFeedbackList.length;
  let heartsRemaining = Array(guessesRemaining).fill("♥ ");
  let [countClippyClicks, setCountClippyClicks] = useState(0);

  return (
    <div className="game-stats">
      <div
        className="button new-game-button"
        // onClick={() => window.location.reload(false)}
        onClick={resetGame}
      >
        Restart Game
      </div>
      <div className="button integer-combo" onClick={handleClick}>
        {showCode ? (isLoading ? code : "loading...") : "View Code"}
      </div>
      <div className="guesses-remaining">{guessesRemaining} guesses left</div>
      <div className="hearts">
        {heartsRemaining.map((heart, i) => (
          <span key={i}>{heart}</span>
        ))}
      </div>
      <div
        className="button clippy-hint-button"
        onClick={() =>
          withClippy(clippy => {
            if (countClippyClicks % 5 === 0) {
              clippy.speak(
                "You can also change difficulty by clicking on the # of tries under instructions."
              );
            } else {
              clippy.animate();
            }
            setCountClippyClicks(countClippyClicks + 1);
          })
        }
      >
        Hint
      </div>
      <GameDifficultyForm
        setDifficulty={setDifficulty}
        setTemporaryStyle={setTemporaryStyle}
      />
    </div>
  );
}

export default GameStats;
