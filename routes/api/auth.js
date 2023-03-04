const express = require("express");
const schemas = require("../../schemas");

const { validateBody } = require("../../middlewares");
const { auth } = require("../../controllers");

const router = express.Router();

// register
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  auth.registerUser
);

// login
router.post("/login", validateBody(schemas.loginSchema), auth.loginUser);

module.exports = router;
