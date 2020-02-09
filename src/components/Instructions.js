import React from "react";

function Instructions() {
  return (
    <div>
      <span>
        ================================================================================
      </span>
      <h2>Mastermind</h2>
      <span>
        ================================================================================
      </span>
      {/* Make this collapsible */}
      <p>
        I will generate a random combination of four numbers from 0 through 7.
        <br></br>You will have 10 tries to guess the correct combination.
        <br></br>
        <br></br>At the end of each guess, I will let you know whether you:
        <br></br>- guessed a correct number (✔)
        <br></br>- guessed a correct number and location (○)
        <br></br>- guessed all incorrect numbers (❌)
      </p>
      <p>
        -------------------------------------------------------------------------------
      </p>
    </div>
  );
}

export default Instructions;
