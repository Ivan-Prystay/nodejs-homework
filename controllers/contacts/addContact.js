const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result: newContact },
  });
};

module.exports = addContact;
