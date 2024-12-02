const pullOnePageData = require("./pull");
const { readLocalFileSync } = require("../file/read-file");
const setFilePath = require("../file/set-path");
const writeLocalFile = require("../file/write-file");
const colors = require("colors-console");

// 拉取全部数据
function pullAllData() {}

// 拉取最新数据
function pullLatestData() {
  pullOnePageData(1)
    .then((data) => {
      try {
        let local = readLocalFileSync(setFilePath("../file/", "data.json"));
        if (local) local = JSON.parse(local);
        else local = [];

        const { list, ...rest } = data;
        console.log(rest);
        // todo 判断local中是否已存在当日的数据
        
        writeLocalFile(
          JSON.stringify([data.list[0], ...local]),
          setFilePath("../file/", "data.json")
        );
      } catch (error) {
        console.log(colors("Pull latest data failure!", error));
      }
    })
    .catch(() => {});
}

pullLatestData();

module.exports = {
  pullAllData,
  pullLatestData,
};
