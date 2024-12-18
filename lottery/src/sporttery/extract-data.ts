import { DataSourceType } from '../../types';
import { ResponseData, ResponseHandlerReturn } from './pull-data';
import requestUrl, { GameNoType } from './url';

type ExtractDataFn = (
	data: ResponseData,
	store: DataSourceType,
	type: GameNoType
) => ResponseHandlerReturn;

const extractData: ExtractDataFn = (data, store, type) => {
	if (!data?.value || !data?.success) return false;
	const { pages, pageNo, list } = data?.value;
	list.forEach((element: any) => {
		store.push({
			result: element.lotteryDrawResult,
			date: element.lotteryDrawTime,
			no: Number(element.lotteryDrawNum),
		});
	});
	console.log(`${type} current:`, pageNo);
	return {
		newUrl: requestUrl(type, pageNo + 1),
		end: pages === pageNo,
	};
};

export default extractData;
