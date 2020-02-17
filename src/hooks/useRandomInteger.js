import { useState } from "react";
import { convertStringToIntArray } from "../services/helpers";
import * as api from "../services/api";

export function useRandomInteger(integerParams) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      });
  };

  return [data, changeData, isLoading];
}
