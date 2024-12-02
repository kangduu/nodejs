const colors = require("colors-console");
const fs = require("fs");
const setFilePath = require("./set-path");

/**
 * 异步读文件
 * @param {*} filePath 读取文件的路径
 */
function readLocalFile(filePath) {
  console.log(colors("grey", filePath));
  try {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.log(colors("red", "File read failure!"));
        return null;
      }
      console.log(colors("green", "File read success!"));
      return data;
    });
  } catch (error) {
    return null;
  }
}

/**
 * 同步读文件
 * @param {*} filePath 读取文件的路径
 */
function readLocalFileSync(filePath) {
  console.log(colors("grey", filePath));
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.log(colors("red", "File does not exist!"));
    return null;
  }
}

const data = readLocalFileSync(setFilePath("./", "data.json"));
console.log(JSON.parse(data).length);

module.exports = { readLocalFile, readLocalFileSync };
