const Joi = require("joi");

const { emailRegExp, phoneRegExp } = require("../regExp/regExp");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegExp),
  phone: Joi.string().required().pattern(phoneRegExp),
  favorite: Joi.boolean(),
});

module.exports = addSchema;
