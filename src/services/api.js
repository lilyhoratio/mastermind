import axios from "axios";

const baseUrl = "https://www.random.org";

// const integerParams = {
//   num: 4,
//   min: 0,
//   max: 7,
//   col: 1,
//   base: 10,
//   format: "plain",
//   rnd: "new"
// };

export function getRandomIntegers(integerParams) {
  // let { num, min, max, col, base, format, rnd } = integerParams;
  // console.log("integers", num);
  return axios.get(
    `${baseUrl}/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new`
    // `${baseUrl}/integers/?num=${num}&min=${min}&max=${max}&col=${col}&base=${base}&format=${format}&rnd=${rnd}`
  );
}
