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
    from: "prystay_ivan@ukr.net",
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click verify email</a>`,
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
