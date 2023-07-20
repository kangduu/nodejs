const fs = require('fs');
const fetchData = require('./data.js');

fetchData()
	.then(data => {
		fs.writeFile('data-source.json', JSON.stringify(data), err => {
			if (err) console.log(err);
			console.log('The file has been saved!');
		});
	})
	.catch(error => {
		console.log(error);
	});
