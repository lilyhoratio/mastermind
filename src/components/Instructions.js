import React, { useState } from "react";

function Instructions({ allowedGuesses, setAllowedGuesses }) {
  const [value, setValue] = useState(10);

  const handleChange = e => {
    setValue(e.target.value);
    setAllowedGuesses(e.target.value);
  };
  return (
    <div className="instructions">
      <h2>instructions</h2>
      <p>
        I generated a code composed of four random digits (0-7). You have{" "}
        {/* {allowedGuesses}{" "} */}
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
        <li># of correct location/digit (exact match)</li>
        <li># of correct digit only (fuzzy match) </li>
        <li>all incorrect numbers</li>
      </ul>
      <a href="https://github.com/lilyhoratio/mastermind">Source Code</a>
    </div>
  );
}

export default Instructions;
