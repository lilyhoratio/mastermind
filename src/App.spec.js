import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  // if("decrements guesses left with each user input", () => {

  // })
  let appComp;
  let guessesLeft;
  let generateNewCode;

  beforeEach(() => {
    appComp = render(<App />);
    let getByText = appComp.getByText;
    guessesLeft = getByText(/guesses left/i);
    generateNewCode = getByText(/generate new code/i);
  });

  it("guesses left initialized at 10", () => {
    expect(guessesLeft).toHaveTextContent(/10/);
  });

  // it("user input decrements guesses left", () => {
  //   fireEvent.click(strike);
  //   expect(strikeCount).toHaveTextContent(/2$/);
  // });

  test("It should not allow letters to be inputted", () => {
    const { input } = setup();
    expect(input.value).toBe(""); // empty before
    fireEvent.change(input, { target: { value: "Good Day" } });
    expect(input.value).toBe(""); //empty after
  });
});
