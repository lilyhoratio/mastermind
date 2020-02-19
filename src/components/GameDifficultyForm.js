import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";

function GameDifficultyForm({ setDifficulty, setTemporaryStyle }) {
  const [maxDigitInCode, setMaxDigitInCode] = useState(7);
  const [totalDigitsInCode, setTotalDigitsInCode] = useState(4);
  // const [isCollapsed, setIsCollapsed] = useState(true);

  const handleChangeMaxDigit = e => {
    setMaxDigitInCode(e.target.value);
  };

  const handleChangeDigitsInCode = e => {
    setTotalDigitsInCode(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setDifficulty({ maxDigitInCode, totalDigitsInCode });

    // hacky way to highlight the updated difficulty states after form submission
    setTemporaryStyle("2px dotted #00ff00");
    setTimeout(() => {
      setTemporaryStyle("");
    }, 2000);
  };

  return (
    <Accordion>
      <Accordion.Toggle
        variant="link"
        eventKey="0"
        className="button change-difficulty"
      >
        Change Difficulty
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <form onSubmit={handleSubmit}>
          <div className="difficulty-selection">
            <span>Max digit in code: </span>
            <select value={maxDigitInCode} onChange={handleChangeMaxDigit}>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
          <div className="difficulty-selection">
            <span>Total digits in code: </span>
            <select
              value={totalDigitsInCode}
              onChange={handleChangeDigitsInCode}
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <button className="change-difficulty-button">update</button>
        </form>
      </Accordion.Collapse>
    </Accordion>
  );
}

export default GameDifficultyForm;
