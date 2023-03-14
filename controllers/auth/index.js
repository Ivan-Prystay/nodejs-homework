const { ctrlWrapper } = require("../../helpers");

const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const getCurrent = require("./getCurrent");
const logoutUser = require("./logoutUser");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  getCurrent: ctrlWrapper(getCurrent),
  logoutUser: ctrlWrapper(logoutUser),
  updateSubscription: ctrlWrapper(updateSubscription),

  updateAvatar: ctrlWrapper(updateAvatar),
};
