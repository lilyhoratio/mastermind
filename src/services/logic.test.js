import { countFuzzyAndExactMatches } from "./logic.js";

describe("countFuzzyAndExactMatches()", () => {
  test("if guess and code have no elements in common", () => {
    expect(countFuzzyAndExactMatches([1, 1, 2, 2], [3, 4, 5, 6])).toEqual({
      fuzzyMatch: 0,
      exactMatch: 0
    });
  });

  test("if guess is exactly the code", () => {
    expect(countFuzzyAndExactMatches([1, 2, 5, 5], [1, 2, 5, 5])).toEqual({
      fuzzyMatch: 0,
      exactMatch: 4
    });
  });

  test("if guess is all fuzzy matches", () => {
    expect(countFuzzyAndExactMatches([1, 2, 3, 4], [4, 3, 2, 1])).toEqual({
      fuzzyMatch: 4,
      exactMatch: 0
    });
  });

  test("if guess contains duplicate digits that occur in code, do not inflate fuzzy matches", () => {
    expect(countFuzzyAndExactMatches([4, 3, 2, 2], [2, 2, 2, 2])).toEqual({
      fuzzyMatch: 0,
      exactMatch: 2
    });
  });

  test("if guess contains duplicate digits that occur in code, do not inflate fuzzy matches", () => {
    expect(countFuzzyAndExactMatches([0, 2, 2, 3], [2, 0, 2, 2])).toEqual({
      fuzzyMatch: 2,
      exactMatch: 1
    });
  });
});
