const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const msg = {
  to: "piwedo4080@loongwin.com",
  from: "prystay_ivan@ukr.net", // Use the email address or domain you verified above
  subject: "Sending with Twilio SendGrid is Fun",
  text: "You account is verify",
  html: "<strong>You account is verify</strong>",
};

const sendMail = async () => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

sendMail();
