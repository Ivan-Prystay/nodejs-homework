const express = require("express");

const { NotFound } = require("http-errors");

const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    if (!contacts) {
      throw new Error("Server error");
    }
    res.json({
      status: "success",
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw new NotFound(`Contact with id ${contactId} not found!`);
    }
    res.json({
      status: "success",
      code: 200,
      data: { result: contact },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result: newContact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactDeleted = await removeContact(contactId);
    if (!contactDeleted) {
      throw new NotFound(`Contact with id ${contactId} not found!`);
    }

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: { result: contactDeleted },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const contactUpdated = await updateContact(contactId, req.body);
    if (!contactUpdated) {
      throw new NotFound(`Contact with id ${contactId} not found!`);
    }

    res.json({
      status: "success",
      code: 200,
      data: { result: contactUpdated },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
