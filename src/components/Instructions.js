import React from "react";

function Instructions() {
  return (
    <div className="instructions">
      {/* Make this collapsible */}
      <p>
        I generated a code composed of four random digits (0-7). You have 10
        tries to guess the correct code.
      </p>
      <p>At the end of each guess, I will say you:</p>
      <ul>
        <li>guessed a correct location/digit (✔)</li>
        <li>guessed a correct digit only (○)</li>
        <li>guessed all incorrect numbers (❌)</li>
      </ul>
    </div>
  );
}

export default Instructions;
