const express = require("express");
const schemas = require("../../schemas");

const { validateBody } = require("../../middlewares");
const { auth } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  /* validateBody(schemas.registerSchema) */
  auth.registerUser
);

module.exports = router;
