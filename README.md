### LinkedIn REACH - Mastermind Challenge

## Steps to run locally

1. `git clone https://github.com/lilyhoratio/mastermind.git`
2. `cd mastermind-lily`
3. `yarn` to install dependencies
4. `yarn start` to launch React app

## Use cases to remember

V1. Logic to determine - PESKY DUPLICATES

1. All correct location - break
2. All incorrect - keep going
3. Else - keep going

Features

- [x] Prevent user from inputting non-integers
- [] Prevent user from inputting < or > 4 digits
- [x] Prevent user from inputting numbers after guessing correctly
- [x] Prevent user from inputting numbers after 10 tries
- Game over modals
  - If won, show "you win"
  - If lost, show "you suck"

V2. Future builds

## Stretch

- [] Ask user for name and use as terminal prompt

Original implementation to check for correct location/digit

```javascript
// let guess = "4111";
// let guessCount = 0;

if (integerCombo) {
  while (guessCount < 10) {
    let correctDigit = 0;
    let correctDigitAndLocation = 0;

    for (let i = 0; i < guess.length; i++) {
      //   console.log(guess, integerCombo);
      //   console.log(guess[i], integerCombo[i]);
      if (guess[i] === integerCombo[i]) {
        correctDigitAndLocation++;
      }

      if (integerCombo.includes(guess[i])) {
        correctDigit++;
      }
    }

    correctDigit = correctDigit - correctDigitAndLocation;

    if (correctDigitAndLocation === 4) {
      // win
      break;
    } else if (correctDigit === 0 && correctDigitAndLocation === 0) {
      console.log("All incorrect, dummy");
    } else if (correctDigit !== 0) {
      console.log(`Correct digit & location: ${correctDigitAndLocation}`);
      console.log(`Correct digit only: ${correctDigit}`);
    }
    guessCount++;
  }
}
```

## Misc

// Note: Integer combination is currently stored as a string
// Future implementation of game could convert the string into integer types in order to
// give user hints on numbers (e.g. guess is higher/lower than integer)
