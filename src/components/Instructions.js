import React from "react";

function Instructions() {
  return (
    <div>
      <h1>Welcome to Mastermind</h1>
      {/* Make this collapsible */}
      <p>
        Your goal, should you choose to accept, is to beat me, the nefarious
        computer. I will generate a random combination of four numbers from 0
        through 7. You will have 10 times to guess the four number combinations.
        <br></br>
        <br></br>
        At the end of each guess, I will let you know whether you A. guessed a
        correct number, B. guessed a correct number and location, or C. guessed
        an incorrect number.
      </p>
    </div>
  );
}

export default Instructions;
