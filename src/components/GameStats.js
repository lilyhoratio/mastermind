import React, { useState } from "react";

function GameStats({
  isLoading,
  code,
  guessesAndFeedbackList,
  showCode,
  setShowCode,
  withClippy,
  allowedGuesses,
  resetGame
}) {
  const handleClick = () => {
    setShowCode(!showCode);
  };

  let guessesRemaining = allowedGuesses - guessesAndFeedbackList.length;
  let heartsRemaining = Array(guessesRemaining).fill("♥ ");
  let [countClippyClicks, setCountClippyClicks] = useState(0);

  return (
    <div className="game-stats">
      <div className="button integer-combo" onClick={handleClick}>
        {showCode
          ? isLoading
            ? code
            : "loading code..."
          : "Click to view code"}
      </div>
      <div
        className="button new-game-button"
        // onClick={() => window.location.reload(false)}
        onClick={resetGame}
      >
        Generate new code
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
                "Change difficulty by clicking on the # of tries under instructions."
              );
            } else {
              clippy.animate();
            }
            setCountClippyClicks(countClippyClicks + 1);
          })
        }
      >
        Clippy Hint
      </div>
    </div>
  );
}

export default GameStats;
