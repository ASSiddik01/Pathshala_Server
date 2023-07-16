const express = require("express");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { updateUserZod } = require("./user.validation");
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addToWishList,
  getUserProfile,
  removeFromWishList,
  addToReadList,
} = require("./user.controller");
const { auth } = require("../../../src/middleware/auth");
const router = express.Router();

router.route("/profile").get(auth(), getUserProfile);

router.route("/add-readlist").patch(auth(), addToReadList);

router.route("/add-wishlist").patch(auth(), addToWishList);
router.route("/remove-wishlist").patch(auth(), removeFromWishList);

router.route("/").get(getAllUsers);

router
  .route("/:id")
  .get(getSingleUser)
  .patch(reqValidate(updateUserZod), updateUser)
  .delete(deleteUser);

module.exports = router;
