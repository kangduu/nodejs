const https = require('https');
const fs = require('fs');
const Buffer = require('buffer').Buffer;

// todo 获取数据
const url =
	'https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=35&provinceId=0&pageSize=1000&isVerify=1&pageNo=7';
https
	.get(url, function (res) {
		let html = '';

		res.on('data', function (data) {
			html += data;
		});

		res.on('end', function () {
			const data = JSON.parse(html);
			data.value.list.forEach(item => {
				console.log(
					`${item.lotteryDrawNum}-${item.lotteryDrawTime} : ${item.lotteryDrawResult}`
				);
			});
			// const data = new Uint8Array(Buffer.from(html));
			// fs.writeFile('zhihu.txt', html, err => {
			// 	if (err) console.log(err);
			// 	console.log('The file has been saved!');
			// });
		});
	})
	.on('error', function () {
		console.log('获取数据错误！');
	});

// http
// 	.createServer(function (req, res) {
// 		console.log(req);
// 		res.writeHead(200, { 'Content-Type': 'text/html' });

// 		res.write('<h1>Hi,Kangduu</h1>');
// 		res.end('<p>What you name?</p>');
// 	})
// 	.listen(3000);
