import React, { useState } from "react";

function Instructions({ setAllowedGuesses, difficulty }) {
  const [value, setValue] = useState(10);

  const handleChange = e => {
    setValue(e.target.value);
    setAllowedGuesses(e.target.value);
  };
  return (
    <div className="instructions">
      <h2>instructions</h2>
      <p>
        I generated a code composed of{" "}
        <span style={{ fontWeight: "bold" }}>
          {difficulty.totalDigitsInCode}
        </span>{" "}
        random digits (0-7). You have{" "}
        <span className="attempts-dropdown">
          <select value={value} onChange={handleChange}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </span>{" "}
        tries to guess the correct code. Duplicate digits in a code are
        possible.
      </p>
      <p>At the end of each guess, I will indicate:</p>
      <ul>
        <li># of matching digits and position (exact match)</li>
        <li># of matching digits, but not their location (fuzzy match) </li>
        <li>all incorrect digits</li>
      </ul>
      <a href="https://github.com/lilyhoratio/mastermind">Source Code</a>
    </div>
  );
}

export default Instructions;
