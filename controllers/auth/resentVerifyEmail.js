const { User } = require("../../models");
const { Unauthorized } = require("http-errors");

const sendEmail = require("../../services");

require("dotenv").config();
const { BASE_URL } = process.env;

const resentVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw Unauthorized("Email not found");
  }

  if (user.verify) {
    throw Unauthorized("Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `
        <div style="text-align: center">
        <p style="margin-bottom: 20px">To use our service, you need to confirm your email address. Just press the button below.</p>
        <a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationCode}" style="display:inline-block;color:#ffffff;background-color:#3498db;border:solid 1px #3498db;border-radius:5px;text-decoration:none;font-size:14px;font-weight:bold;margin-bottom: 20px;padding:12px 25px;text-transform:uppercase;border-color:#3498db;" rel="noreferrer noopener">CONFIRM</a>
        <p>If you have not requested email address confirmation, please ignore this email.</p>
            </div>
        `,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send success",
  });
};

module.exports = resentVerifyEmail;
