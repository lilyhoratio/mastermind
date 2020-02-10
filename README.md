# Mastermind Game

Deployed at <url>

## Steps to run locally

1. `git clone https://github.com/lilyhoratio/mastermind.git`
2. `cd mastermind-lily`
3. `yarn` to install dependencies
4. `yarn start` to launch React app

## Code Highlights

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
