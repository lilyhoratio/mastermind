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

export function getRandomIntegers() {
  return axios.get(
    `${baseUrl}/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new`
  );
}

// const APIService = {
//   "getRandomIntegers": function getRandomIntegers() {
//     return axios.get(
//       `${baseUrl}/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new`
//     );
//   }
// };

// export default APIService;
