import http from 'http';
import buffer from 'buffer';

export type ResponseData = Record<string, any>;

export type ResponseHandlerReturn =
	| boolean
	| {
			newUrl: string;
			end: boolean;
	  };

export type ResponseHandler = (data: ResponseData) => ResponseHandlerReturn;

function pullData(url: string, handler: ResponseHandler) {
	const fetch = (
		_url: string,
		_handler: ResponseHandler,
		resolve: any,
		reject: any
	) => {
		if (!url) return reject(null);
		console.log(url);
		http
			.get(_url, function (res) {
				const { statusCode } = res;

				console.log(statusCode);
				if (statusCode === 200) {
					// Successful response (200 OK)
					const chunks: any[] = [];

					res.on('data', chunk => {
						// Collecting the data in chunks
						chunks.push(chunk);
					});

					res.on('end', () => {
						// Concatenate the buffer chunks into a single Buffer
						const bufferData = Buffer.concat(chunks);

						// Handle the buffer data here (e.g., convert to string)
						const dataAsString = bufferData.toString();
						console.log(dataAsString);
					});
				} else if (statusCode === 302) {
					// Redirect res (302 Found)
					const location = res.headers.location;

					location && fetch(location, _handler, resolve, reject);
					console.log(`Redirected to: ${location}`);
				} else {
					// Handle other status codes
					console.error(`Request failed with status code: ${statusCode}`);
				}

				// res.on('data', function (data) {
				// 	const blob = Buffer.from(data).toString();
				// 	console.log(blob);
				// 	// html += data;
				// });

				// res.on('end', function () {
				// 	// console.log(html);
				// 	// const data = JSON.parse(html);
				// 	// const reply: any = _handler(data);
				// 	// if (!reply || reply?.end) resolve(true);
				// 	// else
				// 	// 	setTimeout(() => {
				// 	// 		fetch(reply.newUrl, _handler, resolve, reject);
				// 	// 	}, 1 * 1000);
				// });
			})
			.on('error', function () {
				console.log('获取数据错误！');
				reject(null);
			});
	};

	return new Promise((resolve, reject) => {
		fetch(url, handler, resolve, reject);
	});
}

export default pullData;
