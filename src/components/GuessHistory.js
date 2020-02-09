import React, { useState, useEffect } from "react";
import * as api from "../services/api";

function GuessHistory() {
  // Note: Integer combination is currently stored as a string
  // Future implementation of game could convert the string into integer types in order to
  // give user hints on numbers (e.g. guess is higher/lower than integer)
  const [integers, setIntegers] = useState(null);

  useEffect(() => {
    api
      .getRandomIntegers()
      .then(res => {
        let rawIntegers = res.data;
        let cleanedIntegers = rawIntegers.split("\n").join("");
        setIntegers(cleanedIntegers);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <div>{integers}</div>
    </div>
  );
}

export default GuessHistory;
