import React, { useState } from "react";

function GameDifficultyForm({ setDifficulty }) {
  const [maxDigitInCode, setMaxDigitInCode] = useState(7);
  const [totalDigitsInCode, setTotalDigitsInCode] = useState(4);

  const handleChangeMaxDigit = e => {
    setMaxDigitInCode(e.target.value);
  };

  const handleChangeDigitsInCode = e => {
    setTotalDigitsInCode(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setDifficulty({ maxDigitInCode, totalDigitsInCode });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Change difficulty</h2>
        <label>
          Max digit
          <select value={maxDigitInCode} onChange={handleChangeMaxDigit}>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </label>
        <label>
          Total digits in code
          <select value={totalDigitsInCode} onChange={handleChangeDigitsInCode}>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default GameDifficultyForm;
