import { useState, useEffect } from "react";
import { convertStringToIntArray } from "../services/helpers";
import * as api from "../services/api";

export function useRandomInteger(method) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeData = () => {
    api
      .getRandomIntegers()
      .then(res => {
        let rawIntegers = res.data;
        let cleanedIntegers = convertStringToIntArray(rawIntegers, "\n");
        cleanedIntegers.pop(); // remove last element due to extra \n separator
        setIsLoading(true);
        setData(cleanedIntegers);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });
  };

  return [data, changeData, isLoading, error];
}
