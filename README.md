### LinkedIn REACH - Mastermind Challenge

## Steps to run locally

1. `git clone https://github.com/lilyhoratio/mastermind.git`
2. `cd mastermind-lily`
3. `yarn` to install dependencies
4. `yarn start` to launch React app

## Use cases to remember

Error handling:

- [] Prevent user from inputting non-integers
- [] Prevent user from inputting < or > 4 digits

## Stretch

- [] Ask user for name and use as terminal prompt

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
