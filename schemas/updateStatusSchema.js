const Joi = require("joi");

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = updateStatusSchema;
