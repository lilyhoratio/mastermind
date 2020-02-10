import React, { useState, useEffect } from "react";
import Instructions from "./components/Instructions";
import GuessHistory from "./components/GuessHistory";
import PlayerGuessInput from "./components/PlayerGuessInput";
import GameStats from "./components/GameStats";
import Modal from "./components/Modal";

import { integers } from "./services/data";
import * as api from "./services/api";

import "./App.scss";

function App() {
  const [integerCombo, setIntegerCombo] = useState("5124");
  let integerComboCopyArr = integerCombo.slice().split("");

  const [guessesAndFeedbackList, setGuessesAndFeedbackList] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  // useEffect(() => {
  //   api
  //     .getRandomIntegers()
  //     .then(res => {
  //       let rawIntegers = res.data;
  //       let cleanedIntegers = rawIntegers.split("\n").join("");
  //       setIntegerCombo(cleanedIntegers);

  //       // console.log(createFrequencyCounter(cleanedIntegers));
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  const getComputerFeedback = guess => {
    let guessAndFeedback = { guess: guess };
    let correctDigitOnly = 0;
    let correctLocation = 0;

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === integerCombo[i]) {
        correctLocation++;
      }
      if (integerComboCopyArr.includes(guess[i])) {
        correctDigitOnly++;
        // integerComboCopyArr.splice(i, 1);
        integerComboCopyArr.splice(integerComboCopyArr.indexOf(guess[i], 1));
      }
    }

    correctDigitOnly = correctDigitOnly - correctLocation;

    if (correctLocation === 4) {
      guessAndFeedback["feedback"] = "you win";
      setIsGameOver(true);
      setIsGameWon(true);
    } else if (correctDigitOnly === 0 && correctLocation === 0) {
      guessAndFeedback["feedback"] = "all incorrect";
    } else if (correctLocation > 0) {
      guessAndFeedback["feedback"] = "correct location";
    } else {
      guessAndFeedback["feedback"] = "correct digit only";
    }

    return guessAndFeedback;
  };

  const addGuess = guess => {
    const guessAndFeedback = getComputerFeedback(guess);

    setGuessesAndFeedbackList([...guessesAndFeedbackList, guessAndFeedback]);
    if (guessesAndFeedbackList.length - 9 === 0) {
      setIsGameOver(true);
    }
  };

  return (
    <div className="App">
      <h1>Mastermind</h1>
      <div className="instructions-and-stats">
        <Instructions />
        <GameStats
          integerCombo={integerCombo}
          guessesAndFeedbackList={guessesAndFeedbackList}
        />
      </div>
      <PlayerGuessInput addGuess={addGuess} isGameOver={isGameOver} />
      <GuessHistory guessesAndFeedbackList={guessesAndFeedbackList} />
      <Modal
        isGameOver={isGameOver}
        isGameWon={isGameWon}
        integerCombo={integerCombo}
      />
    </div>
  );
}

export default App;
