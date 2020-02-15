import axios from "axios";

const baseUrl = "https://www.random.org";

export function getRandomIntegers(integerParams) {
  let { num, min, max, col, base, format, rnd } = integerParams;
  return axios.get(
    `${baseUrl}/integers/?num=${num}&min=${min}&max=${max}&col=${col}&base=${base}&format=${format}&rnd=${rnd}`
  );
}
