const cors = require('cors');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

// CORS：允许跨域 （跨域资源共享(Cross Origin Resource Sharing)）
app.use(
	cors({
		credentials: true,
		origin: '*',
	})
);

// app.all("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", " 3.2.1");
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

// 解析以 application/json 提交的数据
const jsonParser = bodyParser.json();
// 解析以 application/x-www-form-urlencoded 提交的数据
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/api/permutation/3/list', jsonParser, function (req, res) {
	const { page, pagesize } = req.body;
	fs.readFile(
		'../permutation3/data-source.json',
		'utf-8',
		function (err, value) {
			try {
				if (err) throw Error(err);
				const data = JSON.parse(value),
					total = data.length,
					pages = Math.ceil(total / pagesize),
					current = page > pages ? pages : page <= 0 ? 1 : page,
					resData = data.slice((current - 1) * pagesize, current * pagesize);

				res.status(200).json({
					code: 200,
					data: resData,
					pagination: {
						current,
						pagesize,
						total,
					},
				});
			} catch (error) {
				console.log(error.message);
				res.status(500).json({ code: 400, msg: error.message });
			}
		}
	);
});

app.listen(3000, () => console.log(`Server running at port 3000`));
