import React from "react";
import { useAPI } from "../services/hooks";

function GameStats({
  code,
  guessesAndFeedbackList,
  showCode,
  setShowCode,
  withClippy,
  allowedGuesses
}) {
  const handleClick = () => {
    setShowCode(!showCode);
  };

  // how to re-use custom hook?
  // import { useAPI } from "./services/hooks";
  // const [ users, isLoading, error, retry ] = useAPI('loadUsers');
  const generateNewCode = () => {};

  let guessesRemaining = allowedGuesses - guessesAndFeedbackList.length;
  let heartsRemaining = Array(guessesRemaining).fill("♥ ");

  return (
    <div className="game-stats">
      <div className="button integer-combo" onClick={handleClick}>
        {showCode ? code : "► Click to view code ◄"}
      </div>
      <div className="button new-game-button" onClick={generateNewCode}>
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
              "Change the # of max attempts by clicking on the number."
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
