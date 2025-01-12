const { User } = require("../../models");
const bcrypt = require("bcrypt");
const { Unauthorized } = require("http-errors");

const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw Unauthorized("Email or password is wrong");
  }

  if (!user.verify) {
    throw Unauthorized("Email not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw Unauthorized("Email or password is wrong");
  }

  const { SECRET_KEY } = process.env;
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};
module.exports = loginUser;
