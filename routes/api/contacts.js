const express = require("express");

const schemas = require("../../schemas/contacts.js");

const { validateBody } = require("../../middlewares");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.listContacts);
router.get("/:contactId", ctrl.getContactById);
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);
router.delete("/:contactId", ctrl.removeContact);
router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateContact);

module.exports = router;
