const bcrypt = require("bcrypt");

const gravatar = require("gravatar");

const { User } = require("../../models");

const { Conflict } = require("http-errors");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (await User.findOne({ email })) {
    throw Conflict("Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    status: "success",
    name: newUser.name,
    email: newUser.email,
    avatarURL,
  });
};
module.exports = registerUser;
