import React from "react";

function Modal({ isGameOver, isGameWon, integerCombo }) {
  if (!isGameOver) return null;

  return (
    <div
      className="modal"
      style={{
        transform: isGameOver ? "translateY(0vh)" : "translateY(-200vh)",
        opacity: isGameOver ? "1" : "0"
      }}
    >
      {isGameWon ? (
        <div>
          <p>You win! You guessed {integerCombo}! </p>
          <div>ヽ༼ຈل͜ຈ༽ﾉ</div>
        </div>
      ) : (
        <div>
          <p>You lose! The correct number combination was {integerCombo}.</p>
          <div>( ͡° ʖ̯ ͡°)</div>
        </div>
      )}
      <p>Generate new random number</p>
    </div>
  );
}

export default Modal;
