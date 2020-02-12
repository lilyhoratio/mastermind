import React, { useState, useEffect } from "react";
// ======= Components
import Instructions from "./components/Instructions";
import GuessHistory from "./components/GuessHistory";
import PlayerGuessInput from "./components/PlayerGuessInput";
import GameStats from "./components/GameStats";
import Modal from "./components/Modal";

// ======= Helpers
import { convertStringToIntArray } from "./services/helpers";
import { useAPI } from "./services/hooks";

import "./App.scss";
import { useClippy } from "use-clippy-now";

function App() {
  // ======= State variables
  const [guessesAndFeedbackList, setGuessesAndFeedbackList] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [allowedGuesses, setAllowedGuesses] = useState("10");
  const [code, isLoading, error] = useAPI("getIntegerCode");

  const withClippy = useClippy("Clippy");

  // ======= Algorithm to determine computer's feedback based on user's input
  const getComputerFeedback = guess => {
    let feedback = "";
    let fuzzyMatch = 0;
    let exactMatch = 0;

    let intGuess = convertStringToIntArray(guess);
    let codeCopy = [...code];

    for (let i = 0; i < codeCopy.length; i++) {
      if (intGuess[i] === codeCopy[i]) {
        exactMatch++;
        intGuess[i] = null;
        codeCopy[i] = null;
      }
    }

    for (let i = 0; i < codeCopy.length; i++) {
      if (codeCopy.includes(intGuess[i]) && intGuess[i] !== codeCopy[i]) {
        fuzzyMatch++;
        codeCopy[codeCopy.indexOf(intGuess[i])] = null;
      }
    }

    if (exactMatch === codeCopy.length) {
      feedback = "you win";
      setIsGameOver(true);
      setIsGameWon(true);
    } else if (fuzzyMatch === 0 && exactMatch === 0) {
      feedback = "all incorrect";
    } else {
      feedback = `exact match === ${exactMatch} && fuzzy match === ${fuzzyMatch}`;
    }

    return { guess, feedback };
  };

  // ======= Add user's input (guess) to guessAndFeedback variable
  // (Store history of user guesses and computer feedback)
  const addGuess = guess => {
    const guessAndFeedback = getComputerFeedback(guess);

    setGuessesAndFeedbackList([...guessesAndFeedbackList, guessAndFeedback]);

    if (guessesAndFeedbackList.length === allowedGuesses - 1) {
      setIsGameOver(true);
    }
  };

  return (
    <div className="App">
      <h1 className="typewriter">Mastermind</h1>
      <div className="instructions-and-stats">
        <Instructions
          allowedGuesses={allowedGuesses}
          setAllowedGuesses={setAllowedGuesses}
        />
        <GameStats
          code={code}
          guessesAndFeedbackList={guessesAndFeedbackList}
          showCode={showCode}
          setShowCode={setShowCode}
          withClippy={withClippy}
          allowedGuesses={allowedGuesses}
        />
      </div>
      <PlayerGuessInput addGuess={addGuess} isGameOver={isGameOver} />
      <GuessHistory guessesAndFeedbackList={guessesAndFeedbackList} />
      <Modal isGameOver={isGameOver} isGameWon={isGameWon} code={code} />
    </div>
  );
}

export default App;
