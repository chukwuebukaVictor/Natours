// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//   //Create a transporter
//   const transporter = nodemailer.createTransport({
//     // service: 'Gmail',
//     host: process.env.EMAIL_HOST,
//     port: process.port.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   //Define the email options
//   const mailOptions = {
//     from: 'Victor <testuser15@gmail.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };
//   //Actually send the email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Victor <hello@jonas.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
