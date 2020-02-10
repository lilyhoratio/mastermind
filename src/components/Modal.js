import React, { useEffect } from "react";
import * as api from "../services/api";

function Modal({ isGameOver, isGameWon, integerCombo }) {
  if (!isGameOver) return null;

  return (
    <div className="modal">
      <p className="modal-header">Message</p>
      {isGameWon ? (
        <div className="modal-content">
          <p>You win! You guessed {integerCombo}! </p>
          <div>ヽ༼ຈل͜ຈ༽ﾉ ━━☆ﾟ. *</div>
        </div>
      ) : (
        <div className="modal-content">
          <p>You lose! The correct number combination was {integerCombo}.</p>
          <div>( ͡° ʖ̯ ͡°) ┏༼ ◉╭╮◉༽┓ ( ⚈̥̥̥̥̥́⌢⚈̥̥̥̥̥̀) </div>
        </div>
      )}
      <div
        className="generate-number-button"
        onClick={() => window.location.reload(false)}
      >
        Generate new random number
      </div>
    </div>
  );
}

export default Modal;
