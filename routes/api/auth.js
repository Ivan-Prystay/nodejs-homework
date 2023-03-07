const express = require("express");
const schemas = require("../../schemas");

const { validateBody, authenticate } = require("../../middlewares");
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

// current
router.get("/current", authenticate, auth.getCurrent);

// logout
router.post("/logout", authenticate, auth.logoutUser);

// updateSubscription
router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  auth.updateSubscription
);

module.exports = router;
