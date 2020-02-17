// ======= Helper function algorithm to count the number of fuzzy and exact matches
export function countFuzzyAndExactMatches(guess, code) {
  let fuzzyMatch = 0;
  let exactMatch = 0;

  // Check for exact matches by comparing each index's element of guess to the analogous one in code
  // For matches, mark them as seen by updating element to null so that the next for loop
  // does not inflate fuzzy matches when guess contains duplicate digits that are in code
  // For example: if code = 4322 and guess = 2222, should expect exactMatch = 2 && fuzzyMatch = 0 (rather than fuzzyMatch = 2)
  for (let i = 0; i < code.length; i++) {
    if (guess[i] === code[i]) {
      exactMatch++;
      guess[i] = null;
      code[i] = null;
    }
  }

  // Check for fuzzy matches by checking if the guess element is included in the code and is not an exact match
  // For fuzzy matches, mark already seen digits from the code as seen by updating element to null so that they are not double counted
  // For example: if code = 0223 and guess = 2022, should expect exactMatch = 1 && fuzzyMatch = 2 (rather than fuzzyMatch = 3)
  for (let i = 0; i < code.length; i++) {
    if (code.includes(guess[i]) && guess[i] !== code[i]) {
      fuzzyMatch++;
      code[code.indexOf(guess[i])] = null;
    }
  }

  return { fuzzyMatch, exactMatch };
}

console.log(countFuzzyAndExactMatches([1, 2, 3, 4], [5, 6, 7, 8]));
