const Joi = require("joi");

const { emailRegExp } = require("../regExp");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegExp),
  password: Joi.string().min(6).required(),
});

module.exports = registerSchema;
