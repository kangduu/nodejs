// Unhandled Promise Rejection Warning
function service() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject();
		}, 1000);
	});
}

async function request() {
	try {
		await service();
		// .catch(() => {});
		console.log('成功了');
	} catch (error) {
		console.log(error);
	}
}

request();
