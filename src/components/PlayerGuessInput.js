import React, { useState } from "react";

function PlayerGuessInput({ addGuess }) {
  const [guess, setGuess] = useState(null);
  const handleChanges = e => {
    setGuess(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    addGuess(guess);
    setGuess("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="guess"
        placeholder="5231"
        value={guess}
        onChange={handleChanges}
      />
      <button>Submit</button>
    </form>
  );
}

export default PlayerGuessInput;
