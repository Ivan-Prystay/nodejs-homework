const { User } = require("../../models");
const bcrypt = require("bcrypt");
const { Unauthorized } = require("http-errors");

const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  console.log("user: ", user);
  if (!user) {
    throw Unauthorized("Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw Unauthorized("Email or password invalid");
  }

  const { SECRET_KEY } = process.env;
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  res.json({ token });
};
module.exports = loginUser;
