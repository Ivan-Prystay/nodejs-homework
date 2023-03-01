const { User } = require("../../models");

const { Conflict } = require("http-errors");

const registerUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw Conflict("Email already in use");
  }
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = registerUser;
