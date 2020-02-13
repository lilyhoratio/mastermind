import React from "react";

function GameStats({
  code,
  changeCode,
  guessesAndFeedbackList,
  showCode,
  setShowCode,
  withClippy,
  allowedGuesses
}) {
  const handleClick = () => {
    setShowCode(!showCode);
  };

  let guessesRemaining = allowedGuesses - guessesAndFeedbackList.length;
  let heartsRemaining = Array(guessesRemaining).fill("♥ ");

  return (
    <div className="game-stats">
      <div className="button integer-combo" onClick={handleClick}>
        {showCode ? code : "► Click to view code ◄"}
      </div>
      {/* <div className="button new-game-button" onClick={changeCode}> */}
      <div
        className="button new-game-button"
        onClick={() => window.location.reload(false)}
      >
        ↻ Generate new code ↻
      </div>
      <div className="guesses-remaining">{guessesRemaining} guesses left</div>
      <div className="hearts">
        {heartsRemaining.map((heart, i) => (
          <span key={i}>{heart}</span>
        ))}
      </div>
      <div
        className="button"
        onClick={() =>
          withClippy(clippy =>
            clippy.speak(
              "Change difficulty by clicking on the # of tries under instructions."
            )
          )
        }
      >
        Change difficulty
      </div>
    </div>
  );
}

export default GameStats;
