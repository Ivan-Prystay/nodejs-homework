const express = require("express");

const schemas = require("../../schemas");

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

const { contacts } = require("../../controllers");

router.get("/", contacts.listContacts);
router.get("/:contactId", isValidId, contacts.getContactById);
router.post("/", validateBody(schemas.addSchema), contacts.addContact);
router.delete("/:contactId", isValidId, contacts.removeContact);
router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateStatusSchema),
  contacts.updateStatusContact
);

module.exports = router;
