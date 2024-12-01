const fs = require("fs");

function readAllData() {
  return new Promise((resolve, reject) => {
    fs.readFile("data-source.json", "utf-8", (err, value) => {
      try {
        if (err) {
          console.log(err);
          reject([]);
        }
        const data = JSON.parse(value);
        resolve(data);
      } catch (error) {
        console.log(error);
        reject([]);
      }
    });
  });
}

module.exports = readAllData;
