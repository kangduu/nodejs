const { getCountNumber, getFrequencyList } = require("./analysis");
const {
  T3Frequency,
  T2Frequency,
  T0Frequency,
  getAllResultFrequency,
} = require("./analysis/frequency");

// const frequency = getFrequencyList();
// console.log(getCountNumber(Math.max(...frequency) - 1));

// console.log(T3Frequency.reverse());
// console.log(T2Frequency.reverse());
// console.log(T0Frequency.reverse());

// console.log(getAllResultFrequency());

/**
 * 找出 【出现次数 >= 给定次数】 同时 【当前年份】 未开出的号码推荐
 * @param {*} frequency 出现次数
 * @returns
 */
function recommendScheme(frequency = 14) {
  const Connecter = "===";
  const CurrentYear = new Date().getFullYear().toString();
  const Result = getAllResultFrequency();

  let recommend = [];

  for (const key in Result) {
    if (Object.prototype.hasOwnProperty.call(Result, key)) {
      const { count, lotteryDrawResult, times } = Result[key];
      if (
        count >= frequency &&
        times[0] &&
        times[0].split("-")[0] !== CurrentYear
      ) {
        recommend.push(`${lotteryDrawResult}${Connecter}${count}`);
      }
    }
  }

  recommend.sort((a, b) => b.split(Connecter)[1] - a.split(Connecter)[1]);

  return recommend;
}

console.log(recommendScheme());
