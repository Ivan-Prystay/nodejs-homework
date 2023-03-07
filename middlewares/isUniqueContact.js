const { Conflict } = require("http-errors");

const { Contact } = require("../models");

const isUniqueContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const nameExists = await Contact.findOne({
      $and: [{ owner: req.user._id }, { name }],
    });
    if (nameExists) {
      next(Conflict(`Contact with name "${name}" already exists`));
    }
    const emailExists = await Contact.findOne({
      $and: [{ owner: req.user._id }, { email }],
    });
    if (emailExists) {
      next(Conflict(`Contact with email "${email}" already exists`));
    }
    const phoneExists = await Contact.findOne({
      $and: [{ owner: req.user._id }, { phone }],
    });
    if (phoneExists) {
      next(Conflict(`Contact with phone "${phone}" already exists`));
    }
  } catch (error) {
    console.log(error.message);
  }
  next();
};

module.exports = isUniqueContact;
