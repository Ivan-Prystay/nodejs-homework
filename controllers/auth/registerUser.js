const bcrypt = require("bcrypt");

const { User } = require("../../models");

const { Conflict } = require("http-errors");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (await User.findOne({ email })) {
    throw Conflict("Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    status: "success",
    name: newUser.name,
    email: newUser.email,
  });
};
module.exports = registerUser;
