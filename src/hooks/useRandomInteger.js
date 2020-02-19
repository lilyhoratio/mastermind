import { useState } from "react";
import { convertStringToIntArray } from "../services/helpers";
import * as api from "../services/api";

// determine when to use API vs. Math.random() w/ new parameter (check if client has internet access)
export function useRandomInteger(integerParams) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // mocks / stubs - mock API response (= dummy data)
  const changeData = () => {
    api
      .getRandomIntegers(integerParams)
      .then(res => {
        let rawIntegers = res.data;
        let cleanedIntegers = convertStringToIntArray(rawIntegers, "\n");
        cleanedIntegers.pop(); // remove last element due to extra \n separator
        setIsLoading(true);
        setData(cleanedIntegers);
      })
      .catch(err => {
        console.log(err);
        // Math.random()
      });
  };

  // emulate API call with back-up code
  // const changeData = () => {
  //   setData([1, 2, 3, 4]);
  // };

  return [data, changeData, isLoading];
}
