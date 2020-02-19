import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <Accordion>
      <Card.Header>
        <Accordion.Toggle
          variant="link"
          eventKey="0"
          className="button change-difficulty"
        >
          Change Difficulty
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <div className="difficulty-selection">
              <label>
                Max digit in code
                <select value={maxDigitInCode} onChange={handleChangeMaxDigit}>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </select>
              </label>
            </div>
            <div className="difficulty-selection">
              <label>
                Total digits in code
                <select
                  value={totalDigitsInCode}
                  onChange={handleChangeDigitsInCode}
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </label>
            </div>
            <button>Submit</button>
          </form>
        </Card.Body>
      </Accordion.Collapse>
    </Accordion>
  );
}

export default GameDifficultyForm;
