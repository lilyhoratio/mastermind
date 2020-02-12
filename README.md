# Mastermind Game

The game is deployed at [mastermind-lily.netlify.com](www.mastermind-lily.netlify.com), but the user experience is better when run locally due to small issues with Netlify.

## Table of Contents

- [Steps to run locally](#steps-to-run-locally)
- [Features](#features)
- [Unexpected Obstacles](#unexpected-obstacles)
- [Future Improvements](#future-improvements)
- [Tech stack](#tech-stack)

## Steps to run locally

1. `git clone https://github.com/lilyhoratio/mastermind.git`
2. `cd mastermind-lily`
3. `yarn` to install dependencies
4. `yarn start` to launch React app
5. `yarn test` to run tests

## Features

- [x] Ability to toggle viewing the code combination for easier user testing
- [ ] Ability to restart game by generating a new code combination
- [x] Conditional rendering of won game vs. lost game pop-ups
- [x] Computer gives feedback after each guess with the count of exact (correct digit/location) vs. fuzzy matches (correct digit, not location)
- [x] Pacman ghost animation alert with conditional text when:

  - user types in non-integers
  - user submits nothing
  - user submits a guess with more than 4 digits

- [ ] User is prevented from accessing the input form after guessing the correct combination or when they reach 10 tries

Maybe:

- [ ] Save user's first name in localStorage - use as terminal prompt or modal message

## Unexpected Obstacles

I originally coded a simpler form of this game as a CLI game using Node.js. After I got the basic game working, I decided to make it into a web app using React. Managing the state among different components proved to be challenging than I expected, especially as I added more interactivity and detail to the computer feedback.

Adding animations for the ghost was tougher than expected.

### Bug fix in algorithm to count exact vs. fuzzy matches

My first implementation had a bug in counting the exact match vs. fuzzy match of digits in the guess. Because the user could enter a code with duplicate digits, the count of fuzzy matches was sometimes inflated. For example, if the number was 5124, and the user guessed, 5555, the computer incorrected indicated 1 exact match and 3 fuzzy matches (should have been 0 fuzzy matches).

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
  } else {
    guessAndFeedback[
      "feedback"
    ] = `correct location: ${correctLocation}, correct digit: ${correctDigitOnly}`;
  }

  return guessAndFeedback;
};
```

I fixed the logic to account for duplicates. And, I updated variable names to account for potential future implementations where the code to break is not a set of integers, but other values (colors, aninals, etc):

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

  // ===== hidden ===== //

  if (exactMatch === 4) {
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
```

### Helper functions

In src/services/helpers.js - I created the following helper function to convert both the Random Integer API request result and user input from raw strings into an array of integers.

```js
const convertStringToIntArray = (stringInt, separator = "") => {
  return stringInt.split(separator).map(stringInt => parseInt(stringInt, 10));
};
```

Thanks to this guide (https://blog.siliconjungles.io/how-to-use-react-hooks-to-abstract-api-calls) which explained custom hooks and helped in my refactoring of API calls.

Originally, in App.js:

```js
const [code, setCode] = useState([]);

useEffect(() => {
  api
    .getRandomIntegers()
    .then(res => {
      let rawIntegers = res.data;
      let cleanedIntegers = convertStringToIntArray(rawIntegers, "\n");
      cleanedIntegers.pop(); // remove last element due to extra \n separator
      setCode(cleanedIntegers);
    })
    .catch(err => console.log(err));
}, []);
```

Because I would re-use this API call in other components, I abstracted it away in a custom hook:

```js
// hooks.js

export function useAPI() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getRandomIntegers()
      .then(res => {
        let rawIntegers = res.data;
        let cleanedIntegers = convertStringToIntArray(rawIntegers, "\n");
        cleanedIntegers.pop(); // remove last element due to extra \n separator
        setIsLoading(true);
        setData(cleanedIntegers);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });
  }, []);

  return [data, isLoading, error];
}

// App.js could not be simplified to the following:

const [code, isLoading, error] = useAPI("getIntegerCode");
```

## Future Improvements

## Tech Stack

- React
- SASS
- Axios
- Random.org API for random numbers
