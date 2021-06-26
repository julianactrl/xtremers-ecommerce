const server = require('express').Router();
const {
    User,
    Product,
    Order,
    Category,
    Orderline,
    Review,
    Image,
  } = require('../db');

const nodemailer = require('nodemailer');

const smtpTransport = require('nodemailer-smtp-transport');
const { EMAIL_ACCOUNT, EMAIL_PASSWORD } = process.env;


server.post('/send-email', async (req, res) => {
    const { name, email, comment } = req.body;
    
    if (!email) return res.status(400).json({ message: 'Bad request' });

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
        </ul>
        <p>${comment}</p>
    `;

    let transporter = nodemailer.createTransport(
        smtpTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          auth: {
            user: EMAIL_ACCOUNT,
            pass: EMAIL_PASSWORD,
          },
        })
      );

      let info = await transporter.sendMail({
        from: 'sender@server.com',
        to: EMAIL_ACCOUNT,
        subject: 'Website Contact Form',
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    

    transporter.sendMail((err, data) => {
        if (err) {
        res.send(err.message);
        } else {
        res.send("email has been send");
        }
    });
    res.send("email has been send");

    res.redirect('/');

    
});

module.exports = server;