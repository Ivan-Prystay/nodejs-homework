/* eslint-disable no-control-regex */
const Joi = require("joi");

const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");
const phoneRegExp = /^\(\d{3}\) \d{3}-\d{4}$/;

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      match: emailRegExp,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      match: phoneRegExp,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegExp),
  phone: Joi.string().required().pattern(phoneRegExp),
  favorite: Joi.boolean(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { addSchema, updateStatusSchema };

const Contact = model("contacts", contactSchema);

module.exports = { schemas, Contact };
