const express = require("express");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.listContacts);
router.get("/:contactId", isValidId, ctrl.getContactById);
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);
router.delete("/:contactId", isValidId, ctrl.removeContact);
router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
