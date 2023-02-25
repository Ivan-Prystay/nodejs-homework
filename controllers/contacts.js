const { NotFound } = require("http-errors");

const ctrlWrapper = require("../helpers/ctrlWrapper");

const { Contact } = require("../models/contact");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  if (!result) {
    throw new Error("Server error");
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new NotFound(`Contact with id ${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result: newContact },
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contactDeleted = await Contact.findByIdAndRemove(contactId);
  if (!contactDeleted) {
    throw new NotFound(`Contact with id ${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: { result: contactDeleted },
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contactUpdated = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contactUpdated) {
    throw new NotFound(`Contact with id ${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result: contactUpdated },
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const statusUpdated = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!statusUpdated) {
    throw new NotFound(`Contact with id ${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result: statusUpdated },
  });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
