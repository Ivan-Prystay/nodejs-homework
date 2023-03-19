const Joi = require("joi");
const { emailRegExp } = require("../regExp");

const emailSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegExp),
});

module.exports = emailSchema;
