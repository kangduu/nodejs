import { DataSourceType } from '../../types';
import pullData from './pull-data';
import saveData from '../utils/save-data';
import extractData from './extract-data';
import requestUrl, { GameNoType } from './url';

const GameNo: GameNoType = '85';

async function getSuperLottoData() {
	let dataSource: DataSourceType = [];

	await pullData(requestUrl(GameNo, 1), data =>
		extractData(data, dataSource, GameNo)
	);

	saveData(dataSource, 'super-lotto');
}

export default getSuperLottoData;
