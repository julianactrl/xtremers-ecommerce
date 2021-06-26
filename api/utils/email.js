const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { EMAIL_ACCOUNT, EMAIL_PASSWORD } = process.env;


const toIsoStringOffset = function (date) {
	var timeZone = -date.getTimezoneOffset(),
		dif = timeZone >= 0 ? '+' : '-',
		pad = function (num) {
			var normal = Math.floor(Math.abs(num));
			return (normal < 10 ? '0' : '') + normal;
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

const sendMail = (options) => {
	let transporter = nodemailer.createTransport(smtpTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		auth: {
			user: EMAIL_ACCOUNT,
			pass: EMAIL_PASSWORD
		}
	}));

	transporter.sendMail(options, function (error, info) {
		if (error) {
			return ({ status: 400, message: "Mail could not be sent" })
		} else {
			return ({ status: 200, message: "Code sent", ok: true })
		}
	});
	
}

module.exports = { toIsoStringOffset, delayedDays, previousDays, sendMail }