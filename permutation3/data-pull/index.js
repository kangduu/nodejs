const pullOnePageData = require("./pull");
const { readLocalFileSync } = require("../file/read-file");
const setFilePath = require("../file/set-path");
const writeLocalFile = require("../file/write-file");
const colors = require("colors-console");

function readDataJson() {
  let local = readLocalFileSync(setFilePath("../file/", "data.json"));
  if (local) local = JSON.parse(local);
  else local = [];

  return local;
}

function writeDataJson(data) {
  return writeLocalFile(
    JSON.stringify(data),
    setFilePath("../file/", "data.json")
  );
}

function filterResponseData(list) {
  try {
    return list.map(({ prizeLevelList /* remove */, ...rest }) => rest);
  } catch (error) {
    return list;
  }
}

/**
 * 拉取全部数据
 */
async function pullAllData() {
  // 清空文件中的数据
  writeDataJson([]);

  function appendDataInFile(data) {
    return new Promise(async (resolve) => {
      if (Array.isArray(data) && data.length > 0) {
        // 读取文件
        const local = readDataJson();

        // insert
        local.push(...data);

        // 写入文件
        await writeDataJson(local);

        resolve(true);
      }
    });
  }

  async function pullData(page) {
    return new Promise((resolve, reject) => {
      pullOnePageData(page)
        .then(async (data /* object type */) => {
          try {
            const { pages, pageNo, list } = data;

            // handle data then append.
            appendDataInFile(filterResponseData(list));

            // pull completed.
            if (pages === pageNo) resolve("ending");
            // pull next page data.
            else {
              const timeout = Math.ceil((Math.random() + 0.5) * 30 * 1000);
              // waiting
              setTimeout(() => pullData(pageNo + 1), timeout);
            }
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => {
          console.log(colors("red", "Pull All-Data Error!"));
          console.log(colors("red", error));
          reject(error);
        });
    });
  }
  pullData(1);
}

/**
 * 拉取最新数据
 */
function pullLatestData() {
  pullOnePageData(1)
    .then((data) => {
      try {
        const local = readDataJson();
        const list = filterResponseData(data.list);
        // 更新多个新数据
        const latest = [];
        for (let i = 0; i < list.length; i++) {
          const curr = list[i];
          if (
            !local.some((item) => item.lotteryDrawTime === curr.lotteryDrawTime)
          ) {
            latest.push(curr);
          } else break;
        }
        
        const LatestLength = latest.length;
        console.log(colors("blue", `${LatestLength} data has been updated.`));

        if (LatestLength > 0) {
          // write data
          local.unshift(...latest);
          writeDataJson(local);

          // update cache
          writeLocalFile(
            JSON.stringify(local),
            setFilePath("../cache/", "data.json")
          );
          console.log(colors("blue", `Cache data has been updated.`));
        }
      } catch (error) {
        console.log(colors("red", "Pull Latest-Data Error!"));
        console.log(colors("red", error));
      }
    })
    .catch((error) => {
      console.log(colors("red", "Pull Latest-Data Error!"));
      console.log(colors("red", error));
    });
}

module.exports = {
  pullAllData,
  pullLatestData,
};
