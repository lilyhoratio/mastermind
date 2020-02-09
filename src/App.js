import React from "react";
import Instructions from "./components/Instructions";
import GuessHistory from "./components/GuessHistory";
import PlayerGuessInput from "./components/PlayerGuessInput";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">Mastermind</header> */}
      <Instructions />
      <GuessHistory />
      <PlayerGuessInput />
    </div>
  );
}

export default App;
