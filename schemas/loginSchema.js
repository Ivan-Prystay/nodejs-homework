const Joi = require("joi");

const { emailRegExp } = require("../regExp");

const loginSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegExp),
  password: Joi.string().min(6).required(),
});

module.exports = loginSchema;
