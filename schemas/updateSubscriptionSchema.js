const Joi = require("joi");

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

module.exports = updateSubscriptionSchema;
