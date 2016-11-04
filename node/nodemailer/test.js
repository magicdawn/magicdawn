'use strict';

const mailer = require('nodemailer');
const transport = mailer.createTransport({
  service: '163',
  auth: {
    user: 'magic_bot@163.com',
    pass: process.env.MAGIC_BOT_PASS,
  }
});

// setup e-mail data with unicode symbols
const mail = {
  from: '"MyBot" <magic_bot@163.com>',
  to: 'magicdawn@qq.com',
  subject: '错误报告',
  text: 'Hello world 🐴', // plaintext body
  // html: '<b>Hello world 🐴</b>' // html body
};

let err;
try {
  throw new Error('boom');
} catch (e) {
  err = e;
}

// mail.text = err.message;
// mail.text += '\n';
mail.text = err.stack;

transport.sendMail(mail, (err, info) => {
  if (err) {
    return console.error(err);
  }
  console.log('Message sent: ' + info.response);
});