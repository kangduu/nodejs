const readAllData = require("./read.js");

async function count() {
  const data = await readAllData();
  const counter = {};
  data.forEach(({ result }) => {
    const res = result.replaceAll(" ", "");
    if (counter[res]) counter[res] += 1;
    else counter[res] = 1;
  });
  return counter;
}

module.exports = count;
