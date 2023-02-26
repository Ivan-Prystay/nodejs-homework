const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { phoneRegExp, emailRegExp } = require("../regExp/regExp");

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

const Contact = model("contacts", contactSchema);

module.exports = Contact;
