const express = require("express");
const { auth } = require("../../../src/middleware/auth");
const { reqValidate } = require("../../../src/middleware/reqValidate");
const { createBookZod } = require("./book.validation");
const {
  createBook,
  getBooks,
  getBook,
  deleteBook,
} = require("./book.controller");
const router = express.Router();

router
  .route("/")
  .post(auth(), reqValidate(createBookZod), createBook)
  .get(getBooks);

router.route("/:id").get(getBook).delete(auth(), deleteBook);

module.exports = router;
