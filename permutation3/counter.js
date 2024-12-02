const readAllData = require("./read.js");

async function count() {
  const data = await readAllData();
  const counter = {};
  data.forEach(({ result }) => {
    if (counter[result]) counter[result] += 1;
    else counter[result] = 1;
  });

  return counter;
}

module.exports = count;
