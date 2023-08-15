import { DataSourceType } from '../../types';
import pullData from './pull-data';
import saveData from '../utils/save-data';
import extractData from './extract-data';
import requestUrl, { GameNoType } from './url';

const GameNo: GameNoType = '85';

// 数据加工
function processingSuperLottoData(
	data: DataSourceType
): DataSourceType & Record<string, any> {
	return data;
}

async function getSuperLottoData() {
	let dataSource: DataSourceType = [];

	await pullData(requestUrl(GameNo, 1), data => 
		extractData(data, dataSource, GameNo)
	);

	console.log('Start processing super lotto data...');

	dataSource = processingSuperLottoData(dataSource);
	saveData(dataSource, 'super-lotto');

	console.log('SuperLottoData processing completed.');
}

export default getSuperLottoData;
