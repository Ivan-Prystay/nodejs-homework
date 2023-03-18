const { User } = require("../../models");
const { Unauthorized } = require("http-errors");

const sendEmail = require("../../services");

require("dotenv").config();
const { BASE_URL } = process.env;

const resentVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  console.log("user: ", user);

  if (!user) {
    throw Unauthorized("Email not found");
  }

  if (user.verify) {
    throw Unauthorized("Email already verify");
  }

  const verifyEmail = {
    to: email,
    from: "prystay_ivan@ukr.net",
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationCode}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send success",
  });
};

module.exports = resentVerifyEmail;
