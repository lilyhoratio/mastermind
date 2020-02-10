import React, { useState, useEffect } from "react";
import Instructions from "./components/Instructions";
import GuessHistory from "./components/GuessHistory";
import PlayerGuessInput from "./components/PlayerGuessInput";
import GameStats from "./components/GameStats";
import Modal from "./components/Modal";

// import { integers } from "./services/data";
// import * as api from "./services/api";

import "./App.scss";

function App() {
  const [code, setCode] = useState([5, 1, 2, 4]);

  const [guessesAndFeedbackList, setGuessesAndFeedbackList] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [showCode, setShowCode] = useState(false);

  // useEffect(() => {
  //   api
  //     .getRandomIntegers()
  //     .then(res => {
  //       let rawIntegers = res.data;
  //       let cleanedIntegers = rawIntegers.split("\n").join("");
  //       setCode(cleanedIntegers);

  //       // console.log(createFrequencyCounter(cleanedIntegers));
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  const convertStringToIntArray = stringInt => {
    return stringInt.split("").map(stringInt => parseInt(stringInt, 10));
  };

  const getComputerFeedback = guess => {
    let guessAndFeedback = { guess: guess };
    let fuzzyMatch = 0;
    let exactMatch = 0;

    let intGuess = convertStringToIntArray(guess);
    let codeCopy = [...code];

    for (let i = 0; i < intGuess.length; i++) {
      if (intGuess[i] === codeCopy[i]) {
        exactMatch++;
        intGuess[i] = null;
        codeCopy[i] = null;
      }
    }

    for (let i = 0; i < intGuess.length; i++) {
      if (codeCopy.includes(intGuess[i]) && intGuess[i] !== codeCopy[i]) {
        fuzzyMatch++;
        codeCopy[codeCopy.indexOf(intGuess[i])] = null;
      }
    }

    if (exactMatch === 4) {
      guessAndFeedback["feedback"] = "you win";
      setIsGameOver(true);
      setIsGameWon(true);
    } else if (fuzzyMatch === 0 && exactMatch === 0) {
      guessAndFeedback["feedback"] = "all incorrect";
    } else if (exactMatch > 0) {
      guessAndFeedback[
        "feedback"
      ] = `exact match: ${exactMatch}, fuzzy match: ${fuzzyMatch}`;
    } else {
      guessAndFeedback[
        "feedback"
      ] = `exact match: ${exactMatch}, fuzzy match: ${fuzzyMatch}`;
    }

    return guessAndFeedback;
  };

  const addGuess = guess => {
    const guessAndFeedback = getComputerFeedback(guess);

    setGuessesAndFeedbackList([...guessesAndFeedbackList, guessAndFeedback]);
    if (guessesAndFeedbackList.length === 9) {
      setIsGameOver(true);
    }
  };

  return (
    <div className="App">
      <h1 className="typewriter">Mastermind</h1>
      <div className="instructions-and-stats">
        <Instructions />
        <GameStats
          code={code}
          guessesAndFeedbackList={guessesAndFeedbackList}
          showCode={showCode}
          setShowCode={setShowCode}
        />
      </div>
      <PlayerGuessInput addGuess={addGuess} isGameOver={isGameOver} />
      <GuessHistory guessesAndFeedbackList={guessesAndFeedbackList} />
      <Modal isGameOver={isGameOver} isGameWon={isGameWon} code={code} />
    </div>
  );
}

export default App;
