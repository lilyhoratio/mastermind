import React, { useState } from "react";
import Ghost from "../images/ghost.png";

function PlayerGuessInput({ addGuess, isGameOver }) {
  const [guess, setGuess] = useState("");
  const [appear, setAppear] = useState(false);

  const handleChanges = e => {
    if (e.target.value.match(/\D/)) {
      setAppear(true);
    } else {
      setGuess(e.target.value);
    }
    // Remove non-digits by converting them into empty strings using regex
    // setGuess(e.target.value.replace(/\D/, ""));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addGuess(guess);
    setGuess("");
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
              onChange={handleChanges}
              className="guess-input"
            />
          </label>
        </form>
        {/* <button onClick={() => setAppear(true)}>start</button> */}
        <div
          className={`ghost-container${appear ? "" : "-hidden"}`}
          onAnimationEnd={() => setAppear(false)}
        >
          <img id="ghost" src={Ghost} alt="ghost" />
          <span id="ghost-rawr">only numbers allowed!!! </span>
        </div>
      </>
    )
  );
}

export default PlayerGuessInput;
