import { useState, useEffect } from "react";
import { convertStringToIntArray } from "./helpers";
import * as api from "./api";

export function useAPI(method) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  return [data, isLoading, error];
}
