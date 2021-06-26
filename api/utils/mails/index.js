const { sendMail } = require('../email.js');
const pug = require('pug');
const path = require('path');
const { FRONT } = process.env;



const mailOrderCompleted = async (data) => {
	const msj = {	
		subject: 'Successful purchase - Order number',
		appreciate: 'Thanks for your purchase',
		text: 'Thank you for choosing us, your products are being prepared to be dispatched as soon as possible.',
		reviewText: 'Leave a review',
		slogan: 'Xtremers Beyond your Limits!'
		
	};
	
	let mailOptions = {
		from: '"Xtremers Sports" <xtremerssports@gmail.com>',
		to: data.order_email,
		subject: `${msj.subject} ${data.id}`,
		attachments: [{
			filename: 'xtremers.png',
			path: __dirname + '/../../src/assets/img/xtremers.png',
			cid: 'logo'
		}],
		html: pug.renderFile(path.join((__dirname), 'mailOrdersCompleted.pug'), {
			orderlines: data.orderlines,
			linkReview: `${FRONT}/products/reviews`,
			userId: data.userId,
		}),
	}
	
	const mailer = await sendMail(mailOptions)
	
}



const mailOrderInProcess = async (data) => {
	
	const msj = {
		subject: 'Order is being processed Nro',
		appreciate: 'Thank you for choosing us!',
		text: 'If you can not see the link, click below',
		slogan: 'Xtremers Beyond your Limits!!'
	};
	console.log("mensaje --->>", msj.appreciate)
	let mailOptions = {
		from: '"Xtremers Sports" <xtremerssports@gmail.com>',
		to: data.order_email,
		subject: `${msj.subject} ${data.id}`,
		// attachments: [{
		// 	filename: 'xtremers.png',
		// 	path: __dirname + '/../../src/assets/img/xtremers.png',
		// 	cid: 'logo'
		// }],
		html: `<p>Thanks you for choosing us!</p>`,
		// pug.renderFile(path.join((__dirname), 'mailOrdersInProcess.pug'), {
		// 	orderlines: data.orderlines.product,
		//  	 payment_link: data.payment_link
		// }),
	}
	
	
	const mailer = await sendMail(mailOptions)
	
}

module.exports = { mailOrderCompleted, mailOrderInProcess }