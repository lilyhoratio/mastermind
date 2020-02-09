import React, { useState, useEffect } from "react";
import * as api from "./services/api";
import Instructions from "./components/Instructions";
import GuessHistory from "./components/GuessHistory";
import PlayerGuessInput from "./components/PlayerGuessInput";
import "./App.css";

function App() {
  // Note: Integer combination is currently stored as a string
  // Future implementation of game could convert the string into integer types in order to
  // give user hints on numbers (e.g. guess is higher/lower than integer)
  const [integerCombo, setIntegerCombo] = useState(null);
  const [guessesList, setGuessesList] = useState(["5134", "1553", "1224"]);

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
    console.log(guessesList);
  };

  // ====
  let guesses = 0;
  let combination = "";

  // while (guesses < 10 && combination !== integerCombo) {
  //   guesses++;
  // }

  return (
    <div className="App">
      <Instructions />
      <GuessHistory integerCombo={integerCombo} guessesList={guessesList} />
      <PlayerGuessInput addGuess={addGuess} />
    </div>
  );
}

export default App;
