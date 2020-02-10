# Mastermind Game

Deployed at <url>

## Steps to run locally

1. `git clone https://github.com/lilyhoratio/mastermind.git`
2. `cd mastermind-lily`
3. `yarn` to install dependencies
4. `yarn start` to launch React app

## Code Highlights

Because duplicate digits are allowed in the code and guess, the algorithm to get the correct counts for locations and/or digits guessed correctly is a bit trickier.

### V1 implementation - did not account for potential duplicates in guess

The counts are not fully correct because the user could guess a duplicate integer. For example,
if the number was 5124, and the user guessed, 5555, the computer would say say 1 correct location, 3 correct digits (correct answer is 1 correct location, 0 correct digits)

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

### V2

- Loop through to get the correct location count first. Add one to black peg. Mutate the guess & answer to nullify the matching elements.
- Then, loop through to check if guess[i] is in code && guess[i] != code[i]. Add one to white peg. code[code.index(guess[i])] += "PEG!"

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

### Refactor for DRY code

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

## Use cases to remember

V1. Logic to determine - PESKY DUPLICATES

1. All correct location - break
2. All incorrect - keep going
3. Else - keep going

## Features

### Edge-cases

- [x] Prevent user from inputting non-integers
- [] Prevent user from inputting more than 4 digits
- [x] Prevent user from accessing input form after guessing correct combination
- [x] Prevent user from accessing input form after 10 tries

### Misc

- [] Conditional rendering of "Game Over" modals (won game vs. lost game)
- [] Save user's first name in localStorage - use as terminal prompt or modal message
- [] computer gives count of locations matched
- [] computer gives correct count of digits matched
- [] unit tests

V2. Future builds

## Misc

Note: Integer combination is currently stored as a string
Future implementation of game could convert the string into integer types in order to
give user hints on numbers (e.g. guess is higher/lower than integer)

## Built Using

- React
- SASS
- Axios
- Random.org API for random numbers
