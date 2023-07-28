import { DataSourceType } from '../../types';
import { ResponseData, ResponseHandlerReturn } from '../sporttery/pull-data';
import requestUrl, { GameNoType } from './url';

type ExtractDataFn = (
	data: ResponseData,
	store: DataSourceType,
	type: GameNoType
) => ResponseHandlerReturn;

const extractData: ExtractDataFn = (data, store, type) => {
	if (!data?.value || !data?.success) return false;
	const { pages, pageNo, result } = data;
	result.forEach((element: any) => {
		store.push({
			red: element.red,
			blue: element.blue,
			week: element.week,
			date: element.date,
		});
	});
	console.log(`${type} current:`, pageNo);
	return {
		newUrl: requestUrl(type, pageNo + 1),
		end: pages === pageNo,
	};
};

export default extractData;
