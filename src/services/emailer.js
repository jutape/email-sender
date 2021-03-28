const { text } = require("express");
const nodemailer = require("nodemailer");

const _transporter = nodemailer.createTransport({
  host: process.env.EMAILER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAILER_USER,
    pass: process.env.EMAILER_PASS,
  },
});

const sendMailer = (emailFrom, emailTo, name, message) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAILER_USER,
      to: emailTo,
      subject: `[EMAILER] ${name} deseja entrar em contato com você`,
      text: `Olá,<br>
            <b>${name}</b> entrou em contato com você e disse:<br>
            <i>${message}</i><br>
            Entre e contato com ${name} através do email ${emailFrom}.<br>
            <a href="https://github.com/jutape">Disparador feito por jutape.</a>
            `,
    };
    _transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error);
      else resolve(info.response);
    });
  });
};

module.exports = { sendMailer };
