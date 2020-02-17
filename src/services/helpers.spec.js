import { convertStringToIntArray } from "./helpers";

// export const convertStringToIntArray = (stringInt, separator = "") => {
//     return stringInt.split(separator).map(stringInt => parseInt(stringInt, 10));
//   };

test("convertStringToArray converts a string with separators to an array of integers", () => {
  //   expect(convertStringToIntArray("1, 2, 3, 10", ",")).toEqual([1, 2, 3, 4]); // failing test

    expect(convertStringToIntArray("1, 2, 3, 4", ",")).toEqual([1, 2, 3, 4]);

    expect(convertStringToIntArray("1 \n 2 \n 3 \n 4", "\n")).toEqual([
      1,
      2,
      3,
      4
    ]);

  expect(convertStringToIntArray("1 \t 2 \t 3 \t 4", "\t")).toEqual([
    1,
    2,
    3,
    4
  ]);
});
