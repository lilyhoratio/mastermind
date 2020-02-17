import React, { useState, useEffect } from "react";
// ======= Components
import Instructions from "./components/Instructions";
import GuessHistory from "./components/GuessHistory";
import GuessInput from "./components/GuessInput";
import GameStats from "./components/GameStats";
import Modal from "./components/Modal";

// ======= Helpers
import { convertStringToIntArray } from "./services/helpers";
import { useRandomInteger } from "./hooks/useRandomInteger";

// ======= Variables
import { integerAPIParams } from "./services/variables";

import "./App.scss";
import { useClippy } from "use-clippy-now";

function App() {
  // ======= State variables
  const [guessesAndFeedbackList, setGuessesAndFeedbackList] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [allowedGuesses, setAllowedGuesses] = useState("10");
  const [code, changeCode, isLoading] = useRandomInteger(integerAPIParams);
  const withClippy = useClippy("Clippy");

  useEffect(() => {
    changeCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ======= Helper function algorithm to count the number of fuzzy and exact matches
  const countFuzzyAndExactMatches = (guess, code) => {
    let fuzzyMatch = 0;
    let exactMatch = 0;

    // Check for exact matches by comparing each index's element of guess to the analogous one in code
    // For matches, mark them as seen by updating element to null so that the next for loop
    // does not inflate fuzzy matches when guess contains duplicate digits that are in code
    // For example: if code = 4322 and guess = 2222, should expect exactMatch = 2 && fuzzyMatch = 0 (rather than fuzzyMatch = 2)
    for (let i = 0; i < code.length; i++) {
      if (guess[i] === code[i]) {
        exactMatch++;
        guess[i] = null;
        code[i] = null;
      }
    }

    // Check for fuzzy matches by checking if the guess element is included in the code and is not an exact match
    // For fuzzy matches, mark already seen digits from the code as seen by updating element to null so that they are not double counted
    // For example: if code = 0223 and guess = 2022, should expect exactMatch = 1 && fuzzyMatch = 2 (rather than fuzzyMatch = 3)
    for (let i = 0; i < code.length; i++) {
      if (code.includes(guess[i]) && guess[i] !== code[i]) {
        fuzzyMatch++;
        code[code.indexOf(guess[i])] = null;
      }
    }

    return { fuzzyMatch, exactMatch };
  };

  // ======= Algorithm to determine computer's feedback based on user's input
  const getComputerFeedback = guess => {
    let feedback = "";
    let guessCopy = convertStringToIntArray(guess);
    let codeCopy = [...code];

    const { fuzzyMatch, exactMatch } = countFuzzyAndExactMatches(
      guessCopy,
      codeCopy
    );

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
          isLoading={isLoading}
          code={code}
          changeCode={changeCode}
          guessesAndFeedbackList={guessesAndFeedbackList}
          showCode={showCode}
          setShowCode={setShowCode}
          withClippy={withClippy}
          allowedGuesses={allowedGuesses}
        />
      </div>
      <GuessInput addGuess={addGuess} isGameOver={isGameOver} />
      <GuessHistory guessesAndFeedbackList={guessesAndFeedbackList} />
      <Modal
        isGameOver={isGameOver}
        isGameWon={isGameWon}
        code={code}
        changeCode={changeCode}
      />
    </div>
  );
}

export default App;
