const fs = require("fs");
const colors = require("colors-console");

/**
 * 写入文件
 * @param {*} file
 */
function writeLocalFile(file, filePath) {
  fs.writeFile(filePath, file, (err) => {
    if (err) console.log(colors("red", "File write failure!", err));
    console.log(colors("green", "File write success!"));
  });
}

module.exports = writeLocalFile;
