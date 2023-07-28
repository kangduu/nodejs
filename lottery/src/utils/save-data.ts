import fs from 'fs';
import path from 'path';
import { DataSourceType } from '../../types';

export default function saveData(data: DataSourceType, name: string) {
	try {
		fs.writeFile(
			path.resolve(`./src/data/${name || Math.random().toString()}.json`),
			JSON.stringify(data),
			err => {
				if (err) console.log('Write File Error', err);
				else console.log(`The ${name} file has been saved!`);
			}
		);
	} catch (error) {
		console.log('Save Data Error', error);
	}
}
