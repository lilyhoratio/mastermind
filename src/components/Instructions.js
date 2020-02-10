import React from "react";

function Instructions() {
  return (
    <div className="instructions">
      <p>
        I generated a code composed of four random digits (0-7). You have 10
        tries to guess the correct code. Duplicate digits in a code are
        possible.
      </p>
      <p>At the end of each guess, I will indicate:</p>
      <ul>
        <li># of correct location/digit (exact match)</li>
        <li># of correct digit only (fuzzy match) </li>
        <li>all incorrect numbers</li>
      </ul>
    </div>
  );
}

export default Instructions;
