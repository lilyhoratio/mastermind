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

// ======= Business Logic
import { countFuzzyAndExactMatches } from "./services/logic";

// ======= Variables
// import { integerAPIParams } from "./services/variables";

// ======= Styling/Misc Libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { useClippy } from "use-clippy-now";

function App() {
  // ======= State variables
  const [guessesAndFeedbackList, setGuessesAndFeedbackList] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [allowedGuesses, setAllowedGuesses] = useState("10");
  const [difficulty, setDifficulty] = useState({
    maxDigitInCode: 7,
    totalDigitsInCode: 4
  });
  const [code, changeCode, isLoading] = useRandomInteger(difficulty);
  const [allCodes, setAllCodes] = useState([]);
  const [temporaryStyle, setTemporaryStyle] = useState("");
  const withClippy = useClippy("Clippy");

  const resetGame = () => {
    setGuessesAndFeedbackList([]);
    setShowCode(false);
    setAllowedGuesses("10");
    setAllCodes([...allCodes, { code, isGameWon }]);
    setIsGameWon(false);
    setIsGameOver(false);
    changeCode();
    console.log("allCodes:", allCodes);
  };

  useEffect(() => {
    changeCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty.maxDigitInCode, difficulty.totalDigitsInCode]); // with edits
  // }, []);

  // ======= Algorithm to determine computer's feedback based on user's input
  const getComputerFeedback = guess => {
    let feedback = "";
    let guessCopy = convertStringToIntArray(guess);
    let codeCopy = [...code];

    // business logic to count fuzzy vs. exact match in separate handler function
    const { fuzzyMatch, exactMatch } = countFuzzyAndExactMatches(
      guessCopy,
      codeCopy
    );

    // presentational logic to display computer feedback
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
          difficulty={difficulty}
          allowedGuesses={allowedGuesses}
          setAllowedGuesses={setAllowedGuesses}
          temporaryStyle={temporaryStyle}
        />
        <GameStats
          resetGame={resetGame}
          isLoading={isLoading}
          code={code}
          changeCode={changeCode}
          guessesAndFeedbackList={guessesAndFeedbackList}
          showCode={showCode}
          setShowCode={setShowCode}
          withClippy={withClippy}
          allowedGuesses={allowedGuesses}
          setDifficulty={setDifficulty}
          setTemporaryStyle={setTemporaryStyle}
        />
      </div>
      <GuessInput
        addGuess={addGuess}
        isGameOver={isGameOver}
        difficulty={difficulty}
        temporaryStyle={temporaryStyle}
      />
      <GuessHistory guessesAndFeedbackList={guessesAndFeedbackList} />
      <Modal
        isGameOver={isGameOver}
        isGameWon={isGameWon}
        code={code}
        changeCode={changeCode}
        resetGame={resetGame}
      />
    </div>
  );
}

export default App;
