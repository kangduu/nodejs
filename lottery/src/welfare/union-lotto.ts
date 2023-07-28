import { DataSourceType } from '../../types';
import pullData from './pull-data';
import saveData from '../utils/save-data';
import extractData from './extract-data';
import requestUrl, { GameNoType } from './url';

const GameNo: GameNoType = 'ssq';

async function getUnionLottoData() {
	let dataSource: DataSourceType = [];

	await pullData(requestUrl(GameNo, 1), data =>
		extractData(data, dataSource, GameNo)
	);

	saveData(dataSource, 'union-lotto');
}

export default getUnionLottoData;
