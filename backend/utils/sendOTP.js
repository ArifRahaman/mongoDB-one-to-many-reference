const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
require('dotenv').config()
async function sendOTPEmail(userEmail, otp) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arifrahaman2606@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: "arifrahaman2606@gmail.com",
    to: userEmail,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}
module.exports = sendOTPEmail;

