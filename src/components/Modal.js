import React from "react";

function Modal({ isGameOver, isGameWon, code, resetGame }) {
  if (!isGameOver) return null;

  return (
    <div className="modal-container">
      <p className="modal-heading">Message</p>
      {isGameWon ? (
        <div className="modal-info">
          <p>You win! You guessed {code}! </p>
          <div>ヽ༼ຈل͜ຈ༽ﾉ ━━☆ﾟ. *</div>
        </div>
      ) : (
        <div className="modal-info">
          <p>You lose! The correct number combination was {code}.</p>
          <div>( ͡° ʖ̯ ͡°) ┏༼ ◉╭╮◉༽┓ ( ⚈̥̥̥̥̥́⌢⚈̥̥̥̥̥̀) </div>
        </div>
      )}
      <div className="generate-number-button" onClick={resetGame}>
        Generate new random number
      </div>
    </div>
  );
}

export default Modal;
