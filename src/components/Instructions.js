import React from "react";

function Instructions() {
  return (
    <div className="instructions">
      {/* Make this collapsible */}
      <p>
        I generated a random combination of four numbers from 0 through 7. You
        have 10 tries to guess the correct combination.
      </p>
      <p>At the end of each guess, I will say you:</p>
      <ul>
        <li>guessed a correct number (✔)</li>
        <li>guessed a correct number and location (○)</li>
        <li>guessed all incorrect numbers (❌)</li>
      </ul>
    </div>
  );
}

export default Instructions;
