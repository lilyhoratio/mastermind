import React, { useState } from "react";
import Ghost from "../images/ghost.png";

function PlayerGuessInput({ addGuess, isGameOver }) {
  const [guess, setGuess] = useState("");
  const [appear, setAppear] = useState(false);
  const [ghostText, setGhostText] = useState("");

  const handleChange = e => {
    if (e.target.value.match(/\D/)) {
      setGhostText("only numbers allowed!!!");
      setAppear(true);
    } else if (e.target.value.match(/[8-9]/)) {
      setGhostText(`${e.target.value} is not between 0-7!!!`);
      setAppear(true);
    } else {
      setGuess(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (guess.length > 4) {
      setGhostText("too many digits!!!");
      setAppear(true);
    } else if (guess.length === 0) {
      setGhostText("enter something!!!");
      setAppear(true);
    } else {
      addGuess(guess);
      setGuess("");
    }
  };

  return (
    !isGameOver && (
      <>
        <form onSubmit={handleSubmit}>
          <label>
            Enter 4 digits (0-7):
            <input
              type="text"
              name="guess"
              placeholder=""
              value={guess}
              onChange={handleChange}
              className="guess-input"
            />
          </label>
        </form>
        <div
          className={`ghost-container${appear ? "" : "-hidden"}`}
          onAnimationEnd={() => setAppear(false)}
        >
          <img id="ghost" src={Ghost} alt="ghost" />
          <span id="ghost-rawr">{ghostText}</span>
        </div>
      </>
    )
  );
}

export default PlayerGuessInput;
