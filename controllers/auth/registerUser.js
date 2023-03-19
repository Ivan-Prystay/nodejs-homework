const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { User } = require("../../models");
const { Conflict } = require("http-errors");
const sendEmail = require("../../services");

require("dotenv").config();
const { BASE_URL } = process.env;

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  if (await User.findOne({ email })) {
    throw Conflict("Email already in use");
  }

  if (await User.findOne({ name })) {
    throw Conflict(`User with name '${name}' is already registreded`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `
    <div style="text-align: center">
    <p style="margin-bottom: 20px">To use our service, you need to confirm your email address. Just press the button below.</p>
    <a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}" style="display:inline-block;color:#ffffff;background-color:#3498db;border:solid 1px #3498db;border-radius:5px;text-decoration:none;font-size:14px;font-weight:bold;margin-bottom: 20px;padding:12px 25px;text-transform:uppercase;border-color:#3498db;" rel="noreferrer noopener">CONFIRM</a>
    <p>If you have not requested email address confirmation, please ignore this email.</p>
        </div>
    `,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    status: "success",
    name: newUser.name,
    email: newUser.email,
    avatarURL,
  });
};
module.exports = registerUser;
