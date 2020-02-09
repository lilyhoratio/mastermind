import React, { useState, useEffect } from "react";
// import * as api from "../services/api";

function GuessHistory({ integerCombo, guessesList }) {
  return (
    <div>
      <div>CORRECT COMBO: {integerCombo}</div>
      <div>
        {guessesList.map(guess => (
          <p>{guess}</p>
        ))}
      </div>
    </div>
  );
}

export default GuessHistory;
