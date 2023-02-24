const { NotFound } = require("http-errors");

const contactSchema = require("../schemas/contactSchema");

const contacts = require("../models/contacts");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  if (!result) {
    throw new Error("Server error");
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw new NotFound(`Contact with id ${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

const addContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const newContact = await contacts.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result: newContact },
  });
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contactDeleted = await contacts.removeContact(contactId);
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

const updateContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const { contactId } = req.params;
  const contactUpdated = await contacts.updateContact(contactId, req.body);
  if (!contactUpdated) {
    throw new NotFound(`Contact with id ${contactId} not found!`);
  }

  res.json({
    status: "success",
    code: 200,
    data: { result: contactUpdated },
  });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
