const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { emailRegExp } = require("../regExp");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegExp,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMongooseError);

module.exports = model("user", userSchema);
