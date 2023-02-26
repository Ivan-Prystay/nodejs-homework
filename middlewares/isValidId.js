const { isValidObjectId } = require("mongoose");

const createError = require("http-errors");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  console.log("req.params: ", req.params);
  if (!isValidObjectId(contactId)) {
    return next(createError(404, `${contactId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
