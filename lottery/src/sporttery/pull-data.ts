import https from 'https';

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

		https
			.get(_url, function (res) {
				let html: string = '';

				res.on('data', function (data: string) {
					html += data;
				});

				res.on('end', function () {
					const data = JSON.parse(html);
					const reply: any = _handler(data);
					if (!reply || reply?.end) resolve(true);
					else
						setTimeout(() => {
							fetch(reply.newUrl, _handler, resolve, reject);
						}, 1 * 1000);
				});
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
