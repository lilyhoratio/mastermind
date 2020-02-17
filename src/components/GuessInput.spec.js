import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GuessInput from "./GuessInput";

const setup = () => {
  const utils = render(<GuessInput />);
  const input = utils.getByLabelText("guess-input");
  return {
    input,
    ...utils
  };
};

test("It should not allow letters to be inputted", () => {
  const { input } = setup();
  expect(input.value).toBe(""); // empty before
  fireEvent.change(input, { target: { value: "e" } });
  expect(input.value).toBe(""); //empty after
});
