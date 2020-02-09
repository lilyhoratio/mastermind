import React, { useState, useEffect } from "react";
import * as api from "./services/api";
import Instructions from "./components/Instructions";
import GuessHistory from "./components/GuessHistory";
import PlayerGuessInput from "./components/PlayerGuessInput";

import { integers } from "./services/data";

import "./App.css";

function App() {
  // Note: Integer combination is currently stored as a string
  // Future implementation of game could convert the string into integer types in order to
  // give user hints on numbers (e.g. guess is higher/lower than integer)
  const [integerCombo, setIntegerCombo] = useState(null);
  const [guessesList, setGuessesList] = useState(integers);

  useEffect(() => {
    api
      .getRandomIntegers()
      .then(res => {
        let rawIntegers = res.data;
        let cleanedIntegers = rawIntegers.split("\n").join("");
        setIntegerCombo(cleanedIntegers);
      })
      .catch(err => console.log(err));
  }, []);

  // ADD GUESS
  const addGuess = guess => {
    setGuessesList([...guessesList, guess]);
  };

  // if (integerCombo) {
  //   while (guessCount < 10) {
  //     let correctDigit = 0;
  //     let correctDigitAndLocation = 0;

  //     for (let i = 0; i < guess.length; i++) {
  //       //   console.log(guess, integerCombo);
  //       //   console.log(guess[i], integerCombo[i]);
  //       if (guess[i] === integerCombo[i]) {
  //         correctDigitAndLocation++;
  //       }

  //       if (integerCombo.includes(guess[i])) {
  //         correctDigit++;
  //       }
  //     }

  //     correctDigit = correctDigit - correctDigitAndLocation;

  //     if (correctDigitAndLocation === 4) {
  //       // win
  //       break;
  //     } else if (correctDigit === 0 && correctDigitAndLocation === 0) {
  //       console.log("All incorrect, dummy");
  //     } else if (correctDigit !== 0) {
  //       console.log(`Correct digit & location: ${correctDigitAndLocation}`);
  //       console.log(`Correct digit only: ${correctDigit}`);
  //     }
  //     guessCount++;
  //   }
  // }

  return (
    <div className="App">
      <Instructions />
      <div>Guesses left: {10 - guessesList.length}</div>
      <GuessHistory integerCombo={integerCombo} guessesList={guessesList} />
      <PlayerGuessInput addGuess={addGuess} />
    </div>
  );
}

export default App;
