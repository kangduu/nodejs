const {
  getAllResultFrequency,
  T3Frequency,
  T2Frequency,
  T0Frequency,
} = require("./frequency");

/**
 * 次数统计
 * @returns
 */
function getFrequencyList() {
  const data = getAllResultFrequency();
  const list = new Set();
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      list.add(value.count);
    }
  }

  return Array.from(list);
}

function getCountNumber(frequency = 1) {
  const data = getAllResultFrequency();
  const result = [];
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      if (value.count === frequency) result.push(value);
    }
  }
  return result;
}

// const frequency = getFrequencyList();
// console.log(getCountNumber(Math.max(...frequency)));
