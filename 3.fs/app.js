const fs = require('fs');

fs.readFile('../data-source.json', 'utf-8', (err, value) => {
	try {
		if (err) {
			console.log(err);
		} else {
			const { data } = JSON.parse(value);

			const record = {};

			data.forEach(item => {
				const key = Number(item.result.split(' ').join(''));
				if (record[key]) {
					record[key] += 1;
				} else record[key] = 1;
			});

			let count = [];
			for (let index = 0; index < 1000; index++) {
				const element = record[index];
				const value = { result: index, count: element || 0 };
				if (value.count === 1) count.push(value);
			}
			console.log(count);
		}
	} catch (error) {
		console.log(error);
	}
});
