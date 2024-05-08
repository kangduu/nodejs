function formatNumberWithUnit(number) {
	const units = ['', '万', '亿'],
		base = 10000;
	let unitIndex = 0;

	while (number >= base && unitIndex < units.length - 1) {
		number /= base;
		unitIndex++;
	}

	return unitIndex ? number.toFixed(1) + units[unitIndex] : number;
}

// 使用示例：
const number1 = 5010145;
const number2 = 1501140;
const number3 = 125025310;

console.log(formatNumberWithUnit(number1)); // 输出 "500"
console.log(formatNumberWithUnit(number2)); // 输出 "1.50千"
console.log(formatNumberWithUnit(number3)); // 输出 "2.50百万"
