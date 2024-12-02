const pullOnePageData = require("./pull");
const { readLocalFileSync } = require("../file/read-file");
const setFilePath = require("../file/set-path");
const writeLocalFile = require("../file/write-file");
const colors = require("colors-console");

// 处理json数据错误问题
function parseJSONData(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

/**
 * 拉取全部数据
 */
async function pullAllData() {
  const result = [];

  async function pullData(page) {
    return new Promise((resolve, reject) => {
      pullOnePageData(page)
        .then(async (data /* object type */) => {
          try {
            // todo 别拦截时的数据类型
            // const jsonData = parseJSONData(data);
            // if (!jsonData) return resolve([]);

            const { pages, pageNo, list } = data;

            // todo handle data

            // push data
            result.push(...list);

            // pull completed.
            if (pages === pageNo) resolve(result);
            // pull next page data.
            else {
              const timeout = Math.ceil((Math.random() + 0.5) * 10 * 1000);
              // waiting
              setTimeout(() => {
                const newPage = pageNo + 1;
                pullData(newPage);
              }, timeout);
            }
          } catch (error) {}
        })
        .catch((error) => {
          console.log(colors("red", "Pull All-Data Error!"));
          console.log(colors("red", error));
          reject(error);
        });
    });
  }

  try {
    await pullData(1);
    writeLocalFile(
      JSON.stringify(result),
      setFilePath("../file/", "data.json")
    );
    return result;
  } catch (error) {
    console.log(colors("red", error));
    return null;
  }
}

/**
 * 拉取最新数据
 */
function pullLatestData() {
  pullOnePageData(1)
    .then((data) => {
      try {
        // const jsonData = parseJSONData(data);
        // if (!jsonData) {
        //   console.log(
        //     colors("red", "Pull Latest-Data response data does not json data!")
        //   );
        //   return;
        // }

        let local = readLocalFileSync(setFilePath("../file/", "data.json"));
        if (local) local = JSON.parse(local);
        else local = [];

        const { list, ...rest } = data;
        const latest = list[0];

        if (
          local.some((item) => item.lotteryDrawTime === latest.lotteryDrawTime)
        ) {
          console.log(colors("blue", "Already exist."));
          return;
        }

        writeLocalFile(
          JSON.stringify([data.list[0], ...local]),
          setFilePath("../file/", "data.json")
        );
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
