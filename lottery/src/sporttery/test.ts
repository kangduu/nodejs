import pullData from './pull-data';
import requestUrl from './url';

function getData() {
	pullData(requestUrl('35', 1, 2), data => {
		console.log(data?.value?.list?.[0]);
		return false;
	});
}

getData();
