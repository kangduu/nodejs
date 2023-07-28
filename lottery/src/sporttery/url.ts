export type GameNoType = '35' | '85'; //35-排列三；85-大乐透

export default function requestUrl(game: GameNoType, page: number) {
	return `https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=${game}&provinceId=0&pageSize=1000&isVerify=1&pageNo=${page}`;
}
