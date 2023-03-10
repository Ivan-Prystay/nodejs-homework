const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const isUniqueContact = require("./isUniqueContact");
const upload = require("./upload");
const resizeAvatar = require("./resizeAvatar");

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  isUniqueContact,
  upload,
  resizeAvatar,
};
