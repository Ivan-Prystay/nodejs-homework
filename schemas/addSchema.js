const Joi = require("joi");

const { emailRegExp, phoneRegExp } = require("../regExp");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegExp),
  phone: Joi.string()
    .required()
    .pattern(phoneRegExp)
    .label("format (012) 345-6789"),
  favorite: Joi.boolean(),
});

module.exports = addSchema;
