const toIsoStringOffset = function (date) {
	var tzo = -date.getTimezoneOffset(),
		dif = tzo >= 0 ? '+' : '-',
		pad = function (num) {
			var norm = Math.floor(Math.abs(num));
			return (norm < 10 ? '0' : '') + norm;
		};
	return date.getFullYear() +
		'-' + pad(date.getMonth() + 1) +
		'-' + pad(date.getDate()) +
		'T' + pad(date.getHours()) +
		':' + pad(date.getMinutes()) +
		':' + pad(date.getSeconds()) +
		'.' + '000-03:00'
}
const delayedDays = function (date, num) {
	return new Date(date.getTime() + (86400000 * num));
}

const previousDays = function (date, num) {
	return new Date(date.getTime() - (86400000 * num));
}



module.exports = { toIsoStringOffset, delayedDays, previousDays}