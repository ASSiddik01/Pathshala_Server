const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const {
  refreshTokenZod,
  changePasswordZod,
  signUpZod,
  signInZod,
} = require("./auth.validation");
const {
  refreshToken,
  changePassword,
  signUp,
  signIn,
} = require("./auth.controller");
const { USER_ROLE } = require("../../../src/constants/user");
const { auth } = require("../../../src/middleware/auth");

const router = express.Router();

router.route("/sign-up").post(reqValidate(signUpZod), signUp);
router.route("/sign-in").post(reqValidate(signInZod), signIn);
router.route("/refresh-token").post(reqValidate(refreshTokenZod), refreshToken);
router
  .route("/change-password")
  .post(auth(USER_ROLE.USER), reqValidate(changePasswordZod), changePassword);

module.exports = router;
