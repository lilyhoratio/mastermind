import React from "react";

function Modal({ isGameOver, isGameWon, integerCombo }) {
  if (!isGameOver) return null;

  return isGameWon ? (
    <div>
      <p>You win! You guessed {integerCombo}! </p>
      <div>ヽ༼ຈل͜ຈ༽ﾉ</div>
    </div>
  ) : (
    <div>
      <p>You lose! The correct number combination was {integerCombo}.</p>
      <div>( ͡° ʖ̯ ͡°)</div>
    </div>
  );
}

export default Modal;
