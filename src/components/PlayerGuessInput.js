import React, { useState } from "react";

function PlayerGuessInput({ addGuess, isGameOver }) {
  const [guess, setGuess] = useState("");

  const handleChanges = e => {
    // Remove non-digits by converting them into empty strings using regex
    setGuess(e.target.value.replace(/\D/, ""));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addGuess(guess);
    setGuess("");
  };

  let playerName = "Lily";

  return (
    !isGameOver && (
      <form onSubmit={handleSubmit}>
        <label>
          {/* {playerName}'s-Macbook-Pro: ~$ Enter 4 digits (0-7): */}
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
        {/* <button>Submit</button> */}
      </form>
    )
  );
}

export default PlayerGuessInput;
