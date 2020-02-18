import axios from "axios";

const baseUrl = "https://www.random.org";

export function getRandomIntegers(integerParams) {
  let { maxDigitInCode, totalDigitsInCode } = integerParams;
  return axios.get(
    `${baseUrl}/integers/?num=${totalDigitsInCode}&min=0&max=${maxDigitInCode}&col=1&base=10&format=plain&rnd=new`
  );
}
