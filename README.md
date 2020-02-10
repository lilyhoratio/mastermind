# Mastermind Game

Deployed at [mastermind-lily.netlify.com](www.mastermind-lily.netlify.com)

## Table of Contents

- [Steps to run locally](#steps-to-run-locally)
- [Code & Refactoring Highlights](#code-&-refactoring-highlights)
- [Features](#features)
- [Testing & Use Cases](#testing-&-use-cases)
- [Future Improvemets](#future-improvements)
- [Tech stack](#tech-stack)

## Steps to run locally

1. `git clone https://github.com/lilyhoratio/mastermind.git`
2. `cd mastermind-lily`
3. `yarn` to install dependencies
4. `yarn start` to launch React app

## Code & Refactoring Highlights

### Bug fix in algorithm to count exact vs. fuzzy matches

My first implementation had a bug in counting the exact match vs. fuzzy match of digits in the guess. Because the user could enter a code with duplicate digits, the count of fuzzy matches was inflated. For example, if the number was 5124, and the user guessed, 5555, the computer indicated 1 exact match and 3 fuzzy matches.

```javascript
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
    guessAndFeedback[
      "feedback"
    ] = `correct location: ${correctLocation}, correct digit: ${correctDigitOnly}`;
  } else {
    guessAndFeedback[
      "feedback"
    ] = `correct location: ${correctLocation}, correct digit: ${correctDigitOnly}`;
  }

  return guessAndFeedback;
};
```

Fixed the logic and updated variable names to account for potential future implementation where the code is not integers, but other values (colors, aninals, etc):

```javascript
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
```

Refactored into:

```js
const getComputerFeedback = guess => {
  let feedback = "";
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
    feedback = "you win";
    setIsGameOver(true);
    setIsGameWon(true);
  } else if (fuzzyMatch === 0 && exactMatch === 0) {
    feedback = "all incorrect";
  } else {
    feedback = `exact match: ${exactMatch}, fuzzy match: ${fuzzyMatch}`;
  }

  return { guess, feedback };
};
```

## Features

- [] Conditional rendering of "Game Over" modals (won game vs. lost game)
- [] Save user's first name in localStorage - use as terminal prompt or modal message
- [] computer gives count of locations matched
- [] computer gives correct count of digits matched
- [] unit tests

## Testing & Use-cases

- [x] Prevent user from inputting non-integers
- [] Prevent user from inputting more than 4 digits
- [x] Prevent user from accessing input form after guessing correct combination
- [x] Prevent user from accessing input form after 10 tries

## Future Improvements

## Tech Stack

- React
- SASS
- Axios
- Random.org API for random numbers
