const { getAllResultFrequency } = require("./frequency");

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

/**
 * 获取出现指定次数的结果
 * @param {*} frequency 出现次数
 * @returns
 */
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

module.exports = {
  getCountNumber,
  getFrequencyList,
};
