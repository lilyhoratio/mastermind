import React, { useState, useEffect } from "react";
import * as api from "./services/api";
import Instructions from "./components/Instructions";
import GuessHistory from "./components/GuessHistory";
import PlayerGuessInput from "./components/PlayerGuessInput";

import { integers } from "./services/data";

import "./App.css";

function App() {
  const [integerCombo, setIntegerCombo] = useState("5124");
  let integerComboCopyArr = integerCombo.slice().split("");

  const [guessesList, setGuessesList] = useState(integers);
  const [guessesAndFeedbackList, setGuessesAndFeedbackList] = useState([]);

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

  const addGuess = guess => {
    let guessAndFeedback = {};
    guessAndFeedback["guess"] = guess;

    // check guess - helper function
    let correctDigit = 0;
    let correctDigitAndLocation = 0;

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === integerCombo[i]) {
        correctDigitAndLocation++;
      }
      if (integerComboCopyArr.includes(guess[i])) {
        correctDigit++;
        integerComboCopyArr.splice(i, 1);
        // console.log("spliced!", integerComboCopyArr);
        integerComboCopyArr.splice(integerComboCopyArr.indexOf(guess[i], 1));
      }
    }

    correctDigit = correctDigit - correctDigitAndLocation;

    console.log(
      "final [location, digit-only]:",
      correctDigitAndLocation,
      correctDigit
    );

    if (correctDigitAndLocation === 4) {
      guessAndFeedback["feedback"] = "you win";
    } else if (correctDigit === 0 && correctDigitAndLocation === 0) {
      guessAndFeedback["feedback"] = "all incorrect";
    } else if (correctDigitAndLocation > 0) {
      guessAndFeedback["feedback"] = "correct location";
    } else {
      guessAndFeedback["feedback"] = "correct digit";
    }

    console.log(guessAndFeedback);
    // end helper function

    setGuessesList([...guessesList, guess]);
    setGuessesAndFeedbackList([...guessesAndFeedbackList, guessAndFeedback]);
  };

  return (
    <div className="App">
      <Instructions />
      <div>Correct combination: {integerCombo} </div>
      <div>Guesses left: {10 - guessesList.length}</div>
      <GuessHistory guessesAndFeedbackList={guessesAndFeedbackList} />
      <PlayerGuessInput addGuess={addGuess} />
    </div>
  );
}

export default App;
