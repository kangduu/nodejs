import pullData from './pull-data';
import requestUrl, { GameNoType } from './url';
import saveData from '../utils/save-data';
import { DataSourceType } from '../../types';
import extractData from './extract-data';

const GameNo: GameNoType = '35';

async function getPermutation3Data() {
	let dataSource: DataSourceType = [];
	await pullData(requestUrl(GameNo, 1), data =>
		extractData(data, dataSource, GameNo)
	);

	console.log('Permutation3Data', dataSource.length);

	saveData(dataSource, 'permutation3');
}

export default getPermutation3Data;
