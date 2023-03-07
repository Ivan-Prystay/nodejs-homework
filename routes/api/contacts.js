const express = require("express");

const schemas = require("../../schemas");

const { validateBody, isValidId, authenticate,isUniqueContact } = require("../../middlewares");

const router = express.Router();

const { contacts } = require("../../controllers");

router.get("/", authenticate, contacts.listContacts);

router.get("/:contactId", authenticate, isValidId, contacts.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),isUniqueContact,
  contacts.addContact
);

router.delete("/:contactId", authenticate, isValidId, contacts.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusSchema),
  contacts.updateStatusContact
);

module.exports = router;
