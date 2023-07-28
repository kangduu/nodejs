export type GameNoType = 'ssq' | '3d';

export default function requestUrl(game: GameNoType, page: number) {
	return `http://www.cwl.gov.cn/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice?name=ssq&issueCount=&issueStart=&issueEnd=&dayStart=&dayEnd=&pageNo=1&pageSize=30&week=&systemType=PC`;
}
