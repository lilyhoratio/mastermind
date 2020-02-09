import React, { useState } from "react";

function PlayerGuessInput({ addGuess }) {
  const [guess, setGuess] = useState("");

  const handleChanges = e => {
    // Remove non-digit by converting them into empty string using regex
    setGuess(e.target.value.replace(/\D/, ""));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addGuess(guess);
    setGuess("");
  };

  // let playerName = "Lily";

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {/* {playerName}'s-Macbook-Pro: ~$ Enter 4 digits (0-7): */}
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
  );
}

export default PlayerGuessInput;
