const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "az1-ts5.a2hosting.com",
  port: 465,
  
  auth: {
    user: "najaf@designticks.com",
    pass: "yaALLAH786110@",
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("Server is ready to send emails!");
  }
});

async function mailSentToUser(usermail, token) {
  try {
    const info = await transporter.sendMail({
      from: `Najaf Balti: <najaf@designticks.com>`,
      to: `${usermail}`,
      subject: "Email Verification",
      text: "Please click on the link in order to verify your account",
      html: `<a href="http://localhost:3000/verify/${token}">Verify Email</a>`,
    });
    return console.log(`Message Sent to User ${info.messageId}`);
  } catch (error) {
    return console.error("Error Sending Email:", error);
  }
}

module.exports = mailSentToUser;
