const { ctrlWrapper } = require("../../helpers");

const registerUser = require("./registerUser");

module.exports = {
  registerUser: ctrlWrapper(registerUser),
};
