const express = require("express");
const schemas = require("../../schemas");

const {
  validateBody,
  authenticate,
  upload,
  resizeAvatar,
} = require("../../middlewares");
const { auth } = require("../../controllers");

const router = express.Router();

// register
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  auth.registerUser
);

// verify
router.get("/verify/:verificationCode", auth.verifyEmail);

// resendVerify
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  auth.resentVerifyEmail
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

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  resizeAvatar,
  auth.updateAvatar
);

module.exports = router;
